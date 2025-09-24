import { Link } from "react-router-dom"
export function BarraNavegacao(){
    return(
        <nav className="barra">
            <ul>
                <li><Link to="/cadastro">Cadastro de usuário</Link></li>
                <li><Link to="/registro">Cadastro de tarefa</Link></li>
                <li><Link to="/">Gerenciamento de tarefas</Link></li>
            </ul>
        </nav>
    )
}