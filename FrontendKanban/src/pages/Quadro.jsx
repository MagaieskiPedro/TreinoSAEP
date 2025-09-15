import { useState, useEffect } from 'react';
import axios from 'axios';

export function Quadro(){
    const [cartoes,setCartoes] = useState([]);

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
    }, []);

    return(
        <main>
            <h1>Kanban: </h1>
            <section className="quadro">
                <section className="coluna">
                    <h2>A fazer:</h2>
                    {cartoes.map((c)=> (
                        <section className="cartao">
                            <ul className="tarefa">
                                <section>
                                    <li>Descrição: {c.descricao}</li>
                                    <li>Setor: {c.nomeSetor}</li>
                                    <li>Prioridade: {c.prioridade}</li>
                                    <li>Vinculado a: {c.usuario}</li>
                                </section>
                                <section>
                                    <button className="tarefa">editar</button>
                                    <button className="tarefa">excluir</button>
                                </section>
                                <section>
                                    <select name="nome" id="id">
                                        <option value="">A fazer</option>
                                        <option value="">Fazendo</option>
                                        <option value="">Feito</option>
                                    </select>
                                    <button type="button" className="tarefa">alterar status</button>
                                </section>
                            </ul>
                        </section>
                    ))}


                </section>
                <section className="coluna">
                    <h2>Fazendo:</h2>

                    <section className="cartao">
                        <ul className="tarefa">
                            <section>
                                <li>Descrição: </li>
                                <li>Setor: </li>
                                <li>Prioridade: </li>
                                <li>Vinculado a: </li>
                            </section>
                            <section>
                                <button className="tarefa">editar</button>
                                <button className="tarefa">excluir</button>
                            </section>
                            <section>
                                <select name="nome" id="id">
                                    <option value="">A fazer</option>
                                    <option value="">Fazendo</option>
                                    <option value="">Feito</option>
                                </select>
                                <button type="button" className="tarefa">alterar status</button>
                            </section>
                        </ul>
                    </section>

                </section>
                <section className="coluna">
                    <h2>Feito:</h2>

                    <section className="cartao">
                        <ul className="tarefa">
                            <section>
                                <li>Descrição: </li>
                                <li>Setor: </li>
                                <li>Prioridade: </li>
                                <li>Vinculado a: </li>
                            </section>
                            <section>
                                <button className="tarefa">editar</button>
                                <button className="tarefa">excluir</button>
                            </section>
                            <section>
                                <select name="nome" id="id">
                                    <option value="">A fazer</option>
                                    <option value="">Fazendo</option>
                                    <option value="">Feito</option>
                                </select>
                                <button type="button" className="tarefa">alterar status</button>
                            </section>
                        </ul>
                    </section>                    
                 
                </section>


            </section>
        </main>
    );
}