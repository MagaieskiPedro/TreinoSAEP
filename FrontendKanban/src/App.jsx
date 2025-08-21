import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Style/main.scss'
import { Cabecalho } from './Componentes/Cabecalho'
import { BarraNavegacao } from './Componentes/BarraNavegacao'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BarraNavegacao />
      <Cabecalho />
    </>
  )
}

export default App
