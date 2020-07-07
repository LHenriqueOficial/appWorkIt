
export class ContaUser {

    nome?:string;
    email?:string;
    saldo?: number;
    idConta?: string;

    constructor( saldo:number=0, idConta: string,nome:string, email:string ){
        this.nome = nome;    
        this.saldo = saldo;
        this.idConta = idConta;
        this.email = email;
    }
}

