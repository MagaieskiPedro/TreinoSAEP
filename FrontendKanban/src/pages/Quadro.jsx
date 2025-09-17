import { useState, useEffect } from 'react';
import axios from 'axios';

export function Quadro(){
    const [cartoes,setCartoes] = useState([]);
    const [selecionado, setSelecionado] = useState("");
    const [reload, setReload] = useState(false)
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
        <main>
            <h1>Kanban: </h1>
            <section className="quadro">
                <section className="coluna">
                    <h2>A fazer:</h2>
                    {cartoes.filter(c => c.status === "A FAZER").map((c)=> (
                        <section className="cartao">
                            <ul className="tarefa">
                                <section>
                                    {c.status} {c.id}
                                    <li>Descrição: {c.descricao}</li>
                                    <li>Setor: {c.nomeSetor}</li>
                                    <li>Prioridade: {c.prioridade}</li>
                                    <li>Vinculado a: {c.usuario}</li>
                                </section>
                                <section>
                                    <button className="tarefa">editar</button>
                                    <button className="tarefa" onClick={() =>  deletarDados(c.id)}>excluir</button>
                                </section>
                                <section>
                                    <select onChange={(e)=>{
                                        setSelecionado({
                                            ...selecionado,
                                            [c.id]:e.target.value
                                        });
                                    }} value={selecionado[c.id] || ''}>
                                        <option value="">Selecione um status</option>
                                        <option value="A FAZER">A fazer</option>
                                        <option value="FAZENDO">Fazendo</option>
                                        <option value="FEITO">Feito</option>
                                    </select>
                                    <button onClick={() => alterarDados(c.id)} type="button" className="tarefa">alterar status</button>
                                </section>
                            </ul>
                        </section>
                    ))}


                </section>
                <section className="coluna">
                    <h2>Fazendo:</h2>
                    {cartoes.filter(c => c.status === "FAZENDO").map((c)=> (
                        <section className="cartao">
                        <ul className="tarefa">
                            <section>
                                {c.status} {c.id}
                                <li>Descrição: {c.descricao}</li>
                                <li>Setor: {c.nomeSetor}</li>
                                <li>Prioridade: {c.prioridade}</li>
                                <li>Vinculado a: {c.usuario}</li>
                            </section>
                            <section>
                                <button className="tarefa">editar</button>
                                <button className="tarefa" onClick={() =>  deletarDados(c.id)}>excluir</button>
                            </section>
                            <section>
                                <select onChange={(e)=>{
                                        setSelecionado({
                                            ...selecionado,
                                            [c.id]:e.target.value
                                        });
                                    }} value={selecionado[c.id] || ''}>
                                    <option value="">Selecione um status</option>
                                    <option value="A FAZER">A fazer</option>
                                    <option value="FAZENDO">Fazendo</option>
                                    <option value="FEITO">Feito</option>
                                </select>
                                <button onClick={() => alterarDados(c.id)} type="button" className="tarefa">alterar status</button>
                            </section>
                        </ul>
                        </section>
                    ))}
                </section>
                <section className="coluna">
                    <h2>Feito:</h2>
                    {cartoes.filter(c => c.status === "FEITO").map((c)=> (
                        <section className="cartao">
                            <ul className="tarefa">
                                <section>
                                    {c.status} {c.id}
                                    <li>Descrição: {c.descricao}</li>
                                    <li>Setor: {c.nomeSetor}</li>
                                    <li>Prioridade: {c.prioridade}</li>
                                    <li>Vinculado a: {c.usuario}</li>
                                </section>
                                <section>
                                    <button className="tarefa">editar</button>
                                    <button className="tarefa" onClick={() =>  deletarDados(c.id)}>excluir</button>
                                </section>
                                <section>
                                    <select onChange={(e)=>{
                                        setSelecionado({
                                            ...selecionado,
                                            [c.id]:e.target.value
                                        });
                                    }} value={selecionado[c.id] || ''}>
                                        <option value="">Selecione um status</option>
                                        <option value="A FAZER">A fazer</option>
                                        <option value="FAZENDO">Fazendo</option>
                                        <option value="FEITO">Feito</option>
                                    </select>
                                    <button onClick={() => alterarDados(c.id)} type="button" className="tarefa">alterar status</button>
                                </section>
                            </ul>
                        </section>   
                    ))}
                 
                 
                </section>


            </section>
        </main>
    );
}