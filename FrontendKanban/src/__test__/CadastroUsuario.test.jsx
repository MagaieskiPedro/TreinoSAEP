import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CadastroUsuario } from '../pages/CadastroUsuario';
import { describe, it, expect } from "vitest";

describe("Cadastro de Usuário", () =>{
    it("Renderiza os campos necessarios", ()=>{
        render(<CadastroUsuario />);
        const nomeInput = screen.getByLabelText(/Nome/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const botao = screen.getByRole("button", {name: /Cadastrar/i});

        expect(nomeInput).toBeTruthy();
        expect(emailInput).toBeTruthy();
        expect(botao).toBeTruthy();
    })
})