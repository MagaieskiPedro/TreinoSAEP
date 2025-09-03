import axios from 'axios';
import {useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const schemaCadUsuario = z.object({
    nome: z.string()
    .min(1, 'Informe ao menos um caractere de nome')
    .max(50, 'Informe no máximo 40 caracteres'),
    email: z.string()
    .min(9,"Informe ao menos 9 digitos")
    .max(50, 'Informe até 50 caracteres')
    .email('Informe um email valido'),
})

export function CadastroUsuario(){

    const{
        register, //registra input do form
        handleSubmit, // no momento do submit
        formState: {errors}, // captura erros
        reset // limpa campos depois de submit que deu certo
    }=useForm({ resolver: zodResolver(schemaCadUsuario)})

    async function obterDados(data) {
        console.log("Dados Recebidos: ", data)
        try{
            await axios.post("http://127.0.0.1:8000/api/usuario/", data);
            alert("Usuario cadastrado com sucesso! ");
            reset();
        }catch(error){
            alert("Erro ao cadastros usuário");
            console.error("EEEEE, deu ruim, oia ai", error);
        }
    }

    return(
        <form className="formulario" onSubmit={handleSubmit(obterDados)}>
            <h1 className="titulo">Cadastro de Usuário</h1>
            <label>Nome: </label>
            <input type="text" {...register("nome")}/>
            {errors.nome && <p>{errors.nome.message}</p>}
            <label>E-mail </label>
            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
            <button type="submit">Cadastrar</button>
        </form>
    )
}