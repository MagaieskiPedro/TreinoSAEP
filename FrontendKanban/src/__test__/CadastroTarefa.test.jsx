import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CadastroTarefa } from "../pages/CadastroTarefa";
import { describe, it, expect } from "vitest";

describe("Cadastro de Tarefa", () =>{
    it("Renderiza os campos necessarios",() =>{
        render(<CadastroTarefa />);
        const descricaoInput = screen.getByLabelText(/descricao/i);
        const setorInput = screen.getByLabelText(/setor/i);
        const usuarioSelect = screen.getByLabelText(/usuario/i);
        const prioridadeSelect = screen.getByLabelText(/prioridade/i);
        const botao = screen.getByRole("button", {name: /Cadastrar/i});

        expect(descricaoInput).toBeTruthy();
        expect(setorInput).toBeTruthy();
        expect(usuarioSelect).toBeTruthy();
        expect(prioridadeSelect).toBeTruthy();
        expect(botao).toBeTruthy();

    })
})