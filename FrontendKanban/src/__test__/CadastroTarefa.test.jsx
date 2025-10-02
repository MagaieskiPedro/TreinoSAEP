import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CadastroTarefa } from "../pages/CadastroTarefa";
import { describe, it, expect } from "vitest";

describe("Cadastro de Tarefa", () =>{
    it("Renderiza os campos necessarios",() =>{
        render(<CadastroTarefa/>);
        const descricaoInput = screen.getByLabelText("/Descricao/i");
        const setorInput = screen.getByLabelText("/Setor/i");
        const usuarioSelect = screen.getByLabelText("/Usuario/i");
        const prioridadeSelect = screen.getByLabelText("/Prioridade/i");

        expect(descricaoInput ).toBeTruthy();
        expect(setorInput).toBeTruthy();
        expect(usuarioSelect).toBeTruthy();
        expect(prioridadeSelect).toBeTruthy();

    })
})