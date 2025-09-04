import axios from 'axios';
import {useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const schemaCadUsuario = z.object({
    nome: z.string()
    .regex(/^[A-Za-zÀ-ÿ\s]$/,{
        message: "Digite apenas letras e espaços!"
    })
    .regex(/^.{3,50}$/,{ //minimo 3, maximo 50
        message: "Minimo 3 caracteres maximo de 50 caracteres!"
    }),
    email: z.string()
    .regex(/^[A-Za-zÀ-ÿ0-9]{1,50}@[A-Za-zÀ-ÿ]{1,15}\.[A-Za-z]{2,5}$/,{
        message: "Digite um email valido!"
    })
    // .regex(/^.{2,50}$/,{ //minimo , maximo 50
    //     message: "Minimo 9 caracteres maximo de 50 caracteres!"
    // }),
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