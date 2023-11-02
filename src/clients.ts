abstract class Cliente {
    _nome: string;

    constructor(nome:string){
        this._nome = nome;
    }

    getNome():string{
        return this._nome;
    }

    abstract getMensalidade():number;
    
}

class ClienteFisico extends Cliente {
    _idade:number;
    _salario:number;
    constructor(nome:string,idade:number,salario:number){
        super(nome);
        this._idade = idade;
        this._salario = salario;
    }
    
    getIdade():number {
        return this._idade;
    }
    setIdade(idade:number){
        this._idade = idade;
    }

    getSalario():number {
        return this._salario;
    }
    setSalario(salario:number){
        this._salario = salario;
    }

    getMensalidade(): number {
        return this.getSalario() * this.verifyMesalidadeToIdade();
    }

    private verifyMesalidadeToIdade():number {
        return this._idade < 60 ? .1 : .15;
    }

}

class ClienteJuridico extends Cliente {
    _mensalidade:number;

    constructor(nome:string,mensalidade:number){
        super(nome);
        this._mensalidade = mensalidade;
    }

    getMensalidade(): number {
        return this._mensalidade;
    }
    setMensalidade(mensalidade:number){
        this._mensalidade = mensalidade;
    }
    
}

class CadastroClientes {
    _collection:Cliente[];

    constructor(){
        this._collection = [];
    }

    adicionarCliente(cliente:Cliente):boolean{
        this._collection.push(cliente);
        return this._collection.includes(cliente);
    }

    listagemClientes():string[]{
        return this._collection.map(cliente => {
            return cliente.getNome() + " => " + cliente.getMensalidade()
        })
    }
}

export {ClienteFisico, ClienteJuridico, CadastroClientes}