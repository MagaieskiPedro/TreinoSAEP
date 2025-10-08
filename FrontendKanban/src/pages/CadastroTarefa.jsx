import axios from 'axios';
import {useForm } from 'react-hook-form';
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';

const schemaCadTarefa = z.object({
    descricao: z.string()
    .regex(/^[A-Za-zÀ-ÿ\s]{1,200}$/,{
        message: "Digite uma descricao valida!"
    }),
    nomeSetor: z.string()
    .regex(/^[A-Za-zÀ-ÿ0-9]{1,200}$/,{
        message: "Digite um Setor valido!"
    }),
    usuario: z.string()
    .transform((val) => parseInt(val, 10))  // Transformar string em número na base 10
    .refine((val) => isNaN(val), { message: 'ID precisa ser um número válido' }),
    prioridade: z.string()
    .regex(/^[A-Za-zÀ-ÿ0-9]{1,5}$/,{
        message: "Digite uma prioridade valida!"
    }),
})


export function CadastroTarefa(){

    const [usuarios,setUsuarios] = useState([]);

    // GET
    useEffect(() => {
        // Definir uma funcao asincrona no useEffect
        const buscarUsuarios = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/usuario/");
                setUsuarios(res.data);
            } catch (err) {
                console.error("Erro ao buscar usuarios: ", err);
            }
        };
        // Chamar a funcao
        buscarUsuarios();
    }, []);
    // POST
    async function enviarDados(data) {
        console.log("Dados Recebidos: ", data)
        try{
            await axios.post("http://127.0.0.1:8000/api/criarTarefa/", data);
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
    }=useForm({ resolver: zodResolver(schemaCadTarefa)})


    return(
        <form className="formulario" onSubmit={handleSubmit(enviarDados)}>
            <h1 className="titulo">Cadastro de tarefas</h1>
            <label htmlFor='descricao'>Descrição </label>
            <input type="text" id='descricao' alt='campo de descrição' placeholder='Digite a descrição!' {...register("descricao")}/>
            {errors.descricao && <p>{errors.descricao.message}</p>}
            <label htmlFor='setor'>Setor</label>
            <input type="text" alt='nomeSetor' id="setor" placeholder='Digite o nome do setor!' {...register("nomeSetor")} />
            {errors.nomeSetor && <p>{errors.nomeSetor.message}</p>}
            
            <label htmlFor='usuario'>Usuario: </label>
            <select id="usuario" {...register("usuario")}>
                <option value="">Selecione o usuario</option>
                {usuarios.map((u) => (
                    <option key={u.id} value={u.id}>{u.nome}</option>
                ))}
            </select>

            <label htmlFor='prioridade'>Prioridade: </label>
            <select id="prioridade" {...register("prioridade")}>
                <option>Selecione a Prioridade!</option>
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
            </select>

            <button type="submit">Cadastrar</button>

        </form>
    )
}