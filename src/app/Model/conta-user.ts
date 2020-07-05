export class ContaUser {

    nome:string;
    saldo: number;
    idConta:string;

    constructor( saldo:number, idConta: string,nome:string  ){
        this.nome = nome;    
        this.saldo = 0;
        this.idConta = idConta;
     

    }
}

