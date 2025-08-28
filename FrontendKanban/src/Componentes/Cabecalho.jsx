import { BarraNavegacao } from "../Componentes/BarraNavegacao";
export function Cabecalho(){
    return(
        <header className="container">
            <h1 className="titulo">Gerenciamento de tarefa</h1>
            <BarraNavegacao />  
        </header>
    )
}