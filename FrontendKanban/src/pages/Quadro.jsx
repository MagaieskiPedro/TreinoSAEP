import { useState, useEffect } from 'react';
import axios from 'axios';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm } from 'react-hook-form';

// Cartão, com parametros objeto cartão, e id do cartão para deletar
function Cartao({ cartao, onDelete, onEditClick }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: cartao.id.toString(),
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        opacity: isDragging ? 0.5 : 1,
        transition: isDragging ? 'none' : 'transform 200ms ease-out',
      }
    : undefined;

  return (
    <section className="cartao" ref={setNodeRef} style={style} {...listeners} {...attributes} role="group">
      <section className="tarefa">
        <ul>
          <li>{cartao.status} {cartao.id}</li>
          <li>Descrição: {cartao.descricao}</li>
          <li>Setor: {cartao.nomeSetor}</li>
          <li>Prioridade: {cartao.prioridade}</li>
          <li>Vinculado ao usuário: {cartao.usuario}</li>
        </ul>
        <button className="tarefa" onDoubleClick={() => onEditClick(cartao)}>Editar</button>
        <button className="tarefa" onClick={() => onDelete(cartao.id)}>Excluir</button>
      </section>
    </section>
  );
}

// Coluna, com parametros status do cartão, e children para renderizar o componente cartão dentro do componente coluna
function Coluna({ status, children }) {
  const { isOver, setNodeRef } = useDroppable({ id: status });
  
  return (
    <section className={`coluna ${isOver ? 'droppable-over' : ''}`} id={status} ref={setNodeRef}>
      <h2>{status}:</h2>
      {children}
    </section>
  );
}

// Quadro base
export function Quadro() {
  const [cartoes, setCartoes] = useState([]);
  const [usuarios,setUsuarios] = useState([]);
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Controle do modal
  const [selectedCard, setSelectedCard] = useState(null); // Cartão selecionado para edição

  useEffect(() => {
    async function buscarCartoes() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/criarTarefa/');
        setCartoes(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    const buscarUsuarios = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/usuario/");
        setUsuarios(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuarios: ", err);
      }
    };
        // Chamar a funcao
    buscarUsuarios();
    buscarCartoes();
  }, [reload, isModalOpen]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (over && active) {
      const tarefaId = active.id;
      const novaColuna = over.id;

      setCartoes((prev) =>
        prev.map((tarefa) =>
          tarefa.id.toString() === tarefaId ? { ...tarefa, status: novaColuna } : tarefa
        )
      );

      axios
        .patch(`http://127.0.0.1:8000/api/gerenciarTarefa/${tarefaId}`, {
          status: novaColuna,
        })
        .catch((err) => console.error('Erro ao atualizar status:', err));
    }
  }

  async function deletarDados(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/deletarTarefa/${id}`);
      alert('Cartão deletado com sucesso!');
      setReload((r) => !r);
    } catch {
      alert('Erro ao deletar cartão!');
    }
  }
  
  // Schema atualização tarefa
  const schemaAttTarefa = z.object({
    descricao: z.string()
    .regex(/^[A-Za-zÀ-ÿ\s]{1,200}$/,{
        message: "Digite apenas letras e espaços(de 1 a 200 caracteres)!"
    }),
    nomeSetor: z.string()
    .regex(/^[A-Za-zÀ-ÿ0-9]{1,200}$/,{
        message: "Digite um Setor valido(de 1 a 200 caracteres)!"
    }),
    usuario: z.string()
    .transform((val) => parseInt(val, 10))  // Transformar string em número na base 10
    .refine((val) => isNaN(val), { message: 'ID precisa ser um número válido' }),
    prioridade: z.string()
    .regex(/^[A-Za-zÀ-ÿ0-9]{1,5}$/,{
        message: "Digite uma prioridade valida!"
    }),
})

  // Função para abrir o modal de edição
  function handleEditClick(cartao) {
    setSelectedCard(cartao);  // Passa os dados do cartão para o estado
    setIsModalOpen(true);      // Abre o modal
  }

  // Função para salvar a edição no banco
  async function enviarDados() {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/gerenciarTarefa/${selectedCard.id}`, selectedCard);
      setIsModalOpen(false); // Fecha o modal após salvar
      setReload((prev) => !prev); // Atualiza a lista de cartões
    } catch (err) {
      console.error('Erro ao salvar edição:', err);
    }
  }

  // Função para editar o estado do cartão (edição)
  function handleChange(e) {
    const { name, value } = e.target;
    setSelectedCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const{
      register, //registra input do form
      handleSubmit, // no momento do submit
      formState: {errors}, // captura erros
      reset // limpa campos depois de submit que deu certo
  }=useForm({resolver: zodResolver(schemaAttTarefa)})

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <main className="main">
        <h1>Kanban</h1>
        <section className="quadro">
          {['A FAZER', 'FAZENDO', 'FEITO'].map((status) => (
            <Coluna key={status} status={status}>
              {cartoes
                .filter((c) => c.status === status)
                .map((c) => (
                  <Cartao key={c.id} cartao={c} onDelete={deletarDados} onEditClick={handleEditClick} />
                ))}
            </Coluna>
          ))}
        </section>
      </main>

      {/* Modal de Edição */}
      {isModalOpen && selectedCard && (
        <section className="modal cartao">
          <form className="formulario-modal" onSubmit={handleSubmit(enviarDados)}>
            <h1>Editar Cartão</h1>
            <label>Prioridade: </label>
            <select id="selectedField" name="prioridade" onChange={handleChange}>
                <option>Selecione a Prioridade!</option>
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
            </select>
            <section className='botoes-modal'>
              <button onClick={() => setIsModalOpen(false)} className="tarefa">Cancelar</button>
              <button type="submit" onClick={enviarDados} className="tarefa">Salvar</button>
            </section>
          </form>
        </section>
      )}
    </DndContext>
  );
}
