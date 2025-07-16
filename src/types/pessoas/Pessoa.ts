export interface Pessoa {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    cargo: {
        id: number;
        nome: string;
    };
    departamento: {
        id: number;
        nome: string;
    };
    ativo: boolean;
}
