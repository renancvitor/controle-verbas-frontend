export interface Usuario {
    id: number;
    email: string;
    nomePessoa: string;
    tipoUsuario: string;
    idTipoUsuario: number;
    ativo: boolean;
    primeiroAcesso?: boolean;
}

export interface DadosAtualizacaoUsuarioTipo {
    idTipoUsuario: number;
}
