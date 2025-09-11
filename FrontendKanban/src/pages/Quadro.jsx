export function Quadro(){
    return(
        <main>
            <h1>Kanban: </h1>
            <section className="quadro">
                <section className="coluna">
                    <h2>A fazer:</h2>

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