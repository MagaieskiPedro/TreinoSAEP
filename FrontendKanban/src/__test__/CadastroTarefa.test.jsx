import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CadastroTarefa } from "../pages/CadastroTarefa";
import { describe, it, expect } from "vitest";
import axios from "axios";


describe("Cadastro de Tarefa", () =>{
    it("Renderiza os campos necessarios", async() =>{
        render(<CadastroTarefa />);


        const descricaoInput = screen.findByLabelText(/Descrição/i);
        const setorInput = screen.findByLabelText(/setor/i);
        const usuarioSelect = screen.findByLabelText(/usuario/i);
        const prioridadeSelect = screen.findByLabelText(/prioridade/i);
        const descricaoPlaceholder = screen.findByPlaceholderText(/Digite a descrição!/i);
        const setorPlaceholder = screen.findByPlaceholderText(/Digite o nome do setor!/i);
        const botao = screen.findByRole("button", {name: /Cadastrar/i})
        


        expect(descricaoInput).toBeTruthy();
        expect(setorInput).toBeTruthy();
        expect(usuarioSelect).toBeTruthy();
        expect(prioridadeSelect).toBeTruthy();
        expect(botao).toBeTruthy();
        expect(descricaoPlaceholder).toBeTruthy();
        expect(setorPlaceholder).toBeTruthy();

    })
    it("deve mostrar erros quando campos estiverem vazios", async () => {
        render(<CadastroTarefa />);

        fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

        await waitFor(() => {
            expect(screen.getByText("Digite uma descricao valida!")).toBeTruthy();
            expect(screen.getByText("Digite um Setor valido!")).toBeTruthy();
        });
    });
})