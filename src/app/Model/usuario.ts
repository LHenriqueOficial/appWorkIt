import { Profissao } from './profissao';
import { ContaUser } from './conta-user';
import { Formacao } from './formacao';

export class Usuario {

    
    idUser?: string;
    nome?: string;
    sobrenome?: string;
    cpf?: string;
    telefone?: string;
    pais?:string;
    localidade?:string;
    estado?:string;
    cnpj?: string;
    idade?: number;
    email?: string;
    senha?: string;
    status?: boolean;
    profissao?: Array<Profissao>;
    formacao?: Formacao;
    contaUser?: ContaUser;
}
