export function CadastroTarefa(){
    return(
        <form className="formulario">
            <h1 className="titulo">Cadastro de tarefas</h1>
            <label>Descrição </label>
            <input type="text" alt='campo de descrição' required/>
            <label>Setor</label>
            <input type="text" alt='setor' required />
            <select>
                <option>Selecione o usuario</option>
                <option>Fer</option>
                <option>Dori</option>
                <option>Marcia</option>
            </select>
            <label>Prioridade: </label>
            <select name="" id="">
                <option>Selecione a Prioridade!</option>
                <option value="">Baixa</option>
                <option value="">Média</option>
                <option value="">Alta</option>
            </select>
            <button type="submit">Cadastrar</button>
        </form>
    )
}