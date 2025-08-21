import './Style/main.scss'
import { Cabecalho } from './Componentes/Cabecalho'
import { BarraNavegacao } from './Componentes/BarraNavegacao'
import { BrowserRouter } from "react-router-dom";
import { Rotas } from './Rotas/Rotas';

function App() {


  return (
    <>
      <BarraNavegacao />
      <Cabecalho />
    <BrowserRouter>
      <Rotas/>
    </BrowserRouter>
    </>
  )
}

export default App
