import axios from 'axios';
import {useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const schemaCadUsuario = z.object({
    nome: z.string()
    .regex(/^[A-Za-zÀ-ÿ\s]{3,50}$/,{
        message: "Digite apenas letras e espaços de 3 a 50 caracteres!"
    }),
    email: z.string()
    .regex(/^[A-Za-zÀ-ÿ0-9]{1,50}@[A-Za-zÀ-ÿ]{1,15}\.[A-Za-z]{2,5}$/,{
        message: "Digite um email valido!"
    })
})

export function CadastroUsuario(){

    // POST
    async function enviarDados(data) {
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

    // CUIDA DO FORM
    const{
        register, //registra input do form
        handleSubmit, // no momento do submit
        formState: {errors}, // captura erros
        reset // limpa campos depois de submit que deu certo
    }=useForm({ resolver: zodResolver(schemaCadUsuario)})

    
    return(
        <form className="formulario" onSubmit={handleSubmit(enviarDados)}>
            <h1 className="titulo">Cadastro de Usuário</h1>
            <label htmlFor="nome">Nome: </label>
            <input type="text" id="nome" {...register("nome")}/>
            {errors.nome && <p>{errors.nome.message}</p>}
            <label htmlFor='email'>E-mail: </label>
            <input type="email" id="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
            <button type="submit">Cadastrar</button>
        </form>
    )
}