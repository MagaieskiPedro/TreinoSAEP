import { Link } from "react-router-dom"
export function BarraNavegacao(){
    return(
        <nav className="barra">
            <ul>
                <Link to="/cadastro"><li>Cadastro de usuário</li></Link>
                <Link to="/registro"><li>Cadastro de tarefa</li></Link>
                <Link to="/"><li>Gerenciamento de tarefas</li></Link>
            </ul>
        </nav>
    )
}