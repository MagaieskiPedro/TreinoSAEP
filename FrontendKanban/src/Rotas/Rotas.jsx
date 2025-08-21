import { Route, Routes } from "react-router-dom";
import { Quadro } from "../pages/Quadro";
import { Cadastro } from "../pages/Cadastro";

export function Rotas(){
    return(
        <Routes>
            <Route path="/" index element={<Quadro/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
        </Routes>
    )
}