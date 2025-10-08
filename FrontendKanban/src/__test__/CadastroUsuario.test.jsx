import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CadastroUsuario } from "../pages/CadastroUsuario";
import { describe, it, expect,vi} from "vitest";


describe("CadastroUsuario", () => {

  it("deve renderizar todos os campos do formulário", async () => {
    render(<CadastroUsuario />);

    const nomeInput = screen.findByLabelText(/nome/i);
    const emailInput = screen.findByLabelText(/e-mail/i);
    const botao = screen.findByRole("button", { name: /Cadastrar/i });

    expect(nomeInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(botao).toBeTruthy();
  });

  it("deve mostrar erros quando campos estiverem vazios", async () => {
    render(<CadastroUsuario />);

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText("Digite um nome valido!")).toBeTruthy();
      expect(screen.getByText("Digite um email valido!")).toBeTruthy();
    });
  });

  it("deve mostrar erro quando o email tiver formato inválido", async () => {
    render(<CadastroUsuario />);

    fireEvent.input(await screen.findByLabelText(/nome/i), { target: { value: "Maria" } });
    fireEvent.input(await screen.findByLabelText(/e-mail/i), { target: { value: "emailinvalido" } });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));
    await waitFor(() => {
      expect(screen.getByText("Digite um email valido!")).toBeTruthy();
    });
  });

it("deve resetar os campos após submissão", async () => {
    vi.mock("axios", () => ({
        default: {
            post: vi.fn().mockResolvedValue({ data: {} }),
        },
    }));
    render(<CadastroUsuario />);
  

    const nomeInput = await screen.findByLabelText(/nome/i);
    const emailInput = await screen.findByLabelText(/e-mail/i);

  // Preencher os campos
    fireEvent.input(nomeInput, { target: { value: "Maria" } });
    fireEvent.input(emailInput, { target: { value: "maria@email.com" } });

    // Simula o clique no botão
    fireEvent.click(await screen.getByRole("button", { name: /Cadastrar/i }));

    // Aguarda o reset dos campos
    
    await waitFor(() => {
        expect(nomeInput.value).toBe(""); // Espera que o campo nome esteja vazio
        expect(emailInput.value).toBe(""); // Espera que o campo email esteja vazio
    });

});

});
