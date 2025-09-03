import { Cartao } from "../Componentes/Cartao";

export function Quadro(){
    return(
        <main>
            <h1>Kanban: </h1>
            <section className="quadro">
                <section className="coluna">
                    <h2>A fazer:</h2>
                    <Cartao />
                    <Cartao />
                    <Cartao />
                </section>
                <section className="coluna">
                    <h2>Fazendo:</h2>
                    <Cartao />
                    <Cartao />
                    <Cartao />
                    <Cartao />
                </section>
                <section className="coluna">
                    <h2>Feito:</h2>                    
                    <Cartao />
                    <Cartao />                    
                </section>


            </section>
        </main>
    );
}