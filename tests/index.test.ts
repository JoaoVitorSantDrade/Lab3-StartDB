// npm install jest --save-dev
// npm install ts-jest --save-dev
// npm install @types/jest --save-dev


import {Circle} from "../src/circle"
import {Vault, Moeda} from "../src/vault"
import {ClienteFisico,ClienteJuridico,CadastroClientes} from "../src/clients"

describe('testando a implementacao do circulo (Questão 1)', () => {
    test('Circulo de Raio 5 deve ter área igual a aproximadamente 31.41', () => {
    let circle:Circle = new Circle({x:0,y:0},5);
    expect(circle.area()).toBeCloseTo(31.41,1);

    });
    test('Circulo de Raio 7 deve ter diametro igual a 7', () => {
        let circle:Circle = new Circle({x:0,y:0},7);
        expect(circle.getDiameter()).toBeCloseTo(14,1);
    
        });
});

describe('testando a implementacao do cofrinho (Questão 2)', () => {
    
    let cofre:Vault;
    let centavos50:Moeda;
    let centavos20:Moeda;

    beforeAll(() => {
        centavos50 = new Moeda(0.5,"50 Centavos");
        centavos20 = new Moeda(0.2,"20 Centavos");
    });
    
    beforeEach(() => {
        cofre = new Vault();
    })

    test('Criando um cofre vazio', () => {
        expect(cofre.calcularTotal()).toBe(0);
    });

    test('Adicionando 1 moeda no cofre', () => {
        cofre.adicionar(centavos50);
        expect(cofre.calcularTotal()).toBeCloseTo(0.5, 1);
        });

    test('Adicionando 3 moedas no cofre', () => {
        cofre.adicionar(centavos20);
        cofre.adicionar(centavos20);
        cofre.adicionar(centavos20);
        expect(cofre.calcularTotal()).toBeCloseTo(0.6, 1);
        });

    test('Serializando cofrinho para Json', () => {
        cofre.adicionar(centavos20);
        let s:string = JSON.stringify(cofre.toJson())
        expect(true).toBe(true);
    })

    
});

describe('testando a implementação de cofrinho (Questão 3)', () => {
    
    let cofre:Vault;
    let centavos20:Moeda;
    let centavos50:Moeda;
    let centavos10:Moeda;

    beforeAll(() => {
        centavos20 = new Moeda(0.2,"20 Centavos");
        centavos50 = new Moeda(0.5,"50 Centavos");
        centavos10 = new Moeda(0.1,"10 Centavos");
    })

    beforeEach(() => {   
        cofre = new Vault();
        cofre.adicionar(centavos10);
        cofre.adicionar(centavos20);
        cofre.adicionar(centavos50);
    });
    test('Instancia da menor moeda armazenada', () => {
 
        expect(cofre.instanciaMenorMoedaArmazenada()).toBe(centavos10);
    });

    test('Valor da menor moeda armazenada', () => {
        
        expect(cofre.valorMenorMoedaArmazenada()).toBe(centavos10.getValor());
    })

    test('Frequencia das moedas armazenadas', () => {
        
        cofre.adicionar(centavos10);

        let expectedMap:Map<string,number> = new Map()
        expectedMap.set("20 Centavos",1);
        expectedMap.set("50 Centavos",1);
        expectedMap.set("10 Centavos",2);

        expect(cofre.frequenciaCadaMoeda()).toMatchObject(expectedMap);
    })
});

describe('Clientes Fisicos e Juridicos (Questão 4 - A)', () => {
    
    let clienteFisico:ClienteFisico;
    let clienteJuridico:ClienteJuridico;

    beforeAll(() => {
        clienteFisico = new ClienteFisico("Joao", 22, 1100);
        clienteJuridico = new ClienteJuridico("Pedro", 100);
    })
    test('Criação de clientes fisicos', () => {
        expect(clienteFisico.getNome()).toEqual("Joao");
    });

    test('Criação de clientes juridicos', () => {
        expect(clienteJuridico.getNome()).toEqual("Pedro");
    });

    test('Mensalidades de clientes fisicos', () => {
        expect(clienteFisico.getMensalidade()).toBeCloseTo(110);
    });

    test('Mensalidade de clientes juridicos', () =>{
        expect(clienteJuridico.getMensalidade()).toBeCloseTo(100);
    })

});

describe('Cadastro de clientes (Questão 4 - B)', () => {
    
    let cadastroClient:CadastroClientes;

    beforeAll(() => {
        cadastroClient = new CadastroClientes();
    });

    test('Cadastro de clientes', () => {
        let joao:ClienteFisico = new ClienteFisico("Joao",22,1100);
        expect(cadastroClient.adicionarCliente(joao)).toBe(true);
    });

    test('Listagem com todos os clientes', () => {
        let pedro:ClienteFisico = new ClienteFisico("Pedro",61,7400);
        let marcia:ClienteFisico = new ClienteFisico("Marcia",35,9400);
        let luis:ClienteFisico = new ClienteFisico("Luis",29,3100);
        let db:ClienteJuridico = new ClienteJuridico("DB tech", 2400);
        cadastroClient.adicionarCliente(pedro);
        cadastroClient.adicionarCliente(marcia);
        cadastroClient.adicionarCliente(luis);
        cadastroClient.adicionarCliente(db);
        let expectedString:string[] = ["Joao => 110", "Pedro => 1110","Marcia => 940","Luis => 310","DB tech => 2400"];
        expect(cadastroClient.listagemClientes()).toEqual(expectedString);
    });
})