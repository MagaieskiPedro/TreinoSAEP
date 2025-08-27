export function CadastroUsuario(){
    return(
        <form className="formulario">
            <h1 className="titulo">Cadastro de Usuário</h1>
            <label>Nome: </label>
            <input type="text" alt="nome do usuario" required/>
            <label>E-mail </label>
            <input type="email" alt="email do usuario" required />
            <button type="submit">Cadastrar</button>
        </form>
    )
}