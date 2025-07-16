export interface DadosCadastroPessoa {
    nome: string;
    cpf: string;
    email: string;
    idCargo: number;
    idDepartamento: number;
}

export interface DadosCadastroUsuario {
    senha: string;
}

export interface DadosCadastroPessoaUsuario {
    pessoa: DadosCadastroPessoa;
    usuario: DadosCadastroUsuario;
}
