export function Cartao(){
    return(
            <section className="cartao">
                <ul className="tarefa">
                    <li>Descrição: </li>
                    <li>Setor: </li>
                    <li>Prioridade: </li>
                    <li>Vinculado a: </li>
                    <button className="tarefa">editar</button>
                    <button className="tarefa">excluir</button>

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
    );
}