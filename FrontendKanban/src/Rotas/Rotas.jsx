import { Route, Routes } from "react-router-dom";
import { Quadro } from "../pages/Quadro";

import { CadastroUsuario } from "../pages/CadastroUsuario";
import { CadastroTarefa } from "../pages/CadastroTarefa";
import { Inicial } from "../pages/Inicial";

export function Rotas(){
    return(
        <Routes>
            <Route path="/" element={<Inicial/>}>
                <Route index element={<Quadro/>}/>
                <Route path="/cadastro" element={<CadastroUsuario/>} />
                <Route path="/registro" element={<CadastroTarefa/>} />
            </Route>
        </Routes>
    )
}