import { useState, useEffect } from 'react';
import axios from 'axios';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

// Cartão, com parametros objeto cartão, e id do cartão para deletar
function Cartao({ cartao, onDelete }) {

   // DRAG, informa o que pode ser arrastado
   // attributes permite que perifericos usem da ação
   // listeners escuta se o 
   // setNodeRef vincula elemento com o DOM
   // transform da uma ideia de estar sendo movido quando selecionado para o usuario
   // isDragging identifica que esta "segurando" o cartão para arrastar
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: cartao.id.toString(),
  });
  // estilo ao mover usando o transform
  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <section className="cartao" ref={setNodeRef} style={style} {...listeners} {...attributes} aria-disabled="false">
        <section className="tarefa">
            <ul>
                <li>{cartao.status} {cartao.id}</li>
                <li>Descrição: {cartao.descricao}</li>
                <li>Setor: {cartao.nomeSetor}</li>
                <li>Prioridade: {cartao.prioridade}</li>
                <li>Vinculado ao usuário: {cartao.usuario}</li>
            </ul>
            <button className="tarefa">Editar</button>
            <button className="tarefa" onClick={() => onDelete(cartao.id)}>Excluir</button>
        </section>
    </section>
  );
}

// Coluna, com parametros status do cartão, e children para renderizar o componente cartão dentro do componente coluna
function Coluna({ status, children }) {
  
  // DROP
  // identifica o catão sendo arrastado e se foi solto, alterando o status de acordo com a coluna
  const { isOver, setNodeRef } = useDroppable({ id: status });
  
  return (
    <section
      className={`coluna ${isOver ? 'droppable-over' : ''}`}
      id={status}
      ref={setNodeRef}
    >
      <h2>{status}:</h2>
      {children}
    </section>
  );
}

// Quadro base
export function Quadro() {
  // Lista para cartões e variavel reload para fazer GET novamente 
  const [cartoes, setCartoes] = useState([]);
  const [reload, setReload] = useState(false);

  // GET
  useEffect(() => {
    async function buscarCartoes() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/criarTarefa/');
        setCartoes(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    buscarCartoes();
  }, [reload]);

  // PATCH
  // Recebe o evento de segurar e soltar
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
  // DELETE
  async function deletarDados(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/deletarTarefa/${id}`);
      alert('Cartão deletado com sucesso!');
      setReload((r) => !r);
    } catch {
      alert('Erro ao deletar cartão!');
    }
  }

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
                  <Cartao key={c.id} cartao={c} onDelete={deletarDados} />
                ))}
            </Coluna>
          ))}
        </section>
      </main>
    </DndContext>
  );
}