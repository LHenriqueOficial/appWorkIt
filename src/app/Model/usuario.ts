import { Profissao } from './profissao';
import { ContaUser } from './conta-user';

export class Usuario {

    
    idUser?: string;
    nome?: string;
    cpf?: string;
    cnpj?: string;
    idade?: number;
    email?: string;
    senha?: string;
    status?: boolean;
    profissao?: Profissao;
    contaUser?: ContaUser;
}
