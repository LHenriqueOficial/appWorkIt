export class ContaUser {

    nome:string;
    saldo: number;
    idConta:string;
    bancoUser:string;
    tipoConta: string;
    agencia:number;
    numeroConta:number;

    constructor( saldo:number, uid: string,nome:string,bancaUser:string,
        tipoConta:string, agencia:number,numeroConta:number ){
        this.nome = nome;    
        this.saldo = 0;
        this.idConta = uid;
        this.bancoUser= bancaUser;
        this.tipoConta= tipoConta;
        this.agencia = agencia;
        this.numeroConta = numeroConta;

    }
}

