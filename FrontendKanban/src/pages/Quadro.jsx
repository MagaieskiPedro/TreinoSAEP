import { useState, useEffect, act } from 'react';
import axios from 'axios';
import { useDraggable, useDroppable , DndContext} from "@dnd-kit/core"

export function Quadro(){
    const [cartoes,setCartoes] = useState([]);
    const [selecionado, setSelecionado] = useState("");
    const [reload, setReload] = useState(false);

    //DRAGGABLE
    //inserindo controle atual do meu card
    // setNodeRef: é o que liga o elemento arrastavel ao DOM
    // listeners: fofoqueiro que fica escutando a ação
    // atributes: é p que pode ser movido pelo mouse
    // transform: intermediario que da sensação de arrastar
    const { attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id: cartoes.id

    })
    // controla posições no plano cartesiano usando x e y,
    // dando a impressão de movimento ao usuario
    const style = transform ? 
    {transform: `translate(${transform.x}px, ${transform.y}px)`,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',  // Mudança do cursor para indicar que o item pode ser movido
        boxShadow: isDragging ? '0 0 10px rgba(0, 0, 0, 0.2)' : undefined,  // Sombra durante o drag
    }:undefined;


    //DROP PATH
    const {setNodeRef: setDropNodeRef} = useDroppable({ 
        id: cartoes.status
     })

    //DND CONTEXT
    function handleDragEnd(event){
        const {active, over } = event;
        if(over && active){
            const tarefasId = active.id
            const novaColuna = over.id //onde ela foi solta

            setCartoes((prev) =>
                prev.map((tarefa) =>
                    tarefa.id === tarefasId ? {...tarefa, status: novaColuna}: tarefa 
                )
                
            );
            
            axios.patch(`http://127.0.0.1:8000/api/gerenciarTarefa/${id}`, {
                status: novaColuna
            }).catch(err => console.error("É deu ruim", err))
        }
    }

    //GET
    useEffect(() => {
        // Definir uma funcao asincrona no useEffect
        const buscarCartões = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/criarTarefa/");
                setCartoes(res.data);
            } catch (err) {
                console.error("Erro ao buscar Cartões: ", err);
            }
        };
        // Chamar a funcao
        buscarCartões();
    }, [reload]);

    //DELETE
    async function deletarDados(id) {
        try{
            const Response = await axios.delete(`http://127.0.0.1:8000/api/deletarTarefa/${id}`);
            alert("Cartão deletado com sucesso!");
            setReload(!reload);
        }catch(error){
            alert("Erro ao deletar cartão!");
            setReload(!reload);
        }
    }
    //PATCH
    async function alterarDados(id) {
        console.log("Dados Recebidos: ", id,"selecionado",selecionado[id])
        try{
            if(!selecionado){
                alert("Selecione um status!");
                return;
            }
            const Response = await axios.patch(`http://127.0.0.1:8000/api/gerenciarTarefa/${id}`, {
                status: selecionado[id]
            });
            if(Response.status === 200){
                setCartoes(antes => 
                    antes.map(item =>
                        item.id === id ? {...item, status: selecionado[id]} : item
                    )
                )
                alert("Status alterado com sucesso! ");
                setReload(!reload);
            }
            else{
                alert("Status não foi alterado! ");
                setReload(!reload);
            } 
        }catch(error){
            alert("Erro ao alterar Status");
            console.error("EEEEE, deu ruim, oia ai", error);
        }
    }

    return(
           <DndContext onDragEnd={handleDragEnd}>
            <main className="main">
                <h1>Kanban</h1>
                <section className="quadro">
                    {['A FAZER', 'FAZENDO', 'FEITO'].map((status) => (
                        <section
                            key={status}
                            className="coluna"
                            id={status}
                            ref={setDropNodeRef}
                        >
                            <h2>{status}:</h2>
                            {cartoes
                                .filter((c) => c.status === status)
                                .map((c) => (
                                    <section key={c.id} className="cartao">
                                        <section
                                            className="tarefa"
                                            ref={setNodeRef}
                                            {...listeners}
                                            {...attributes}
                                            style={style}
                                        >
                                            <ul>
                                                <li>{c.status} {c.id}</li>
                                                <li>Descrição: {c.descricao}</li>
                                                <li>Setor: {c.nomeSetor}</li>
                                                <li>Prioridade: {c.prioridade}</li>
                                                <li>Vinculado ao usuário: {c.usuario}</li>
                                            </ul>
                                            <button className="tarefa">Editar</button>
                                            <button
                                                className="tarefa"
                                                onClick={() => deletarDados(c.id)}
                                            >
                                                Excluir
                                            </button>
                                            <label htmlFor={`selecao_${status}`}>
                                                Estado:
                                            </label>
                                            <select
                                                id={`selecao_${status}`}
                                                onChange={(e) =>
                                                    setSelecionado({
                                                        ...selecionado,
                                                        [c.id]: e.target.value,
                                                    })
                                                }
                                                value={selecionado[c.id] || ''}
                                            >
                                                <option value="">Selecione um status</option>
                                                <option value="A FAZER">A fazer</option>
                                                <option value="FAZENDO">Fazendo</option>
                                                <option value="FEITO">Feito</option>
                                            </select>
                                            <button
                                                onClick={() => alterarDados(c.id)}
                                                type="button"
                                                className="tarefa"
                                            >
                                                Alterar status
                                            </button>
                                        </section>
                                    </section>
                                ))}
                        </section>
                    ))}
                </section>
            </main>
        </DndContext>
    );
}