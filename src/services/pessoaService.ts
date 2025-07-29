import api from "./api";
import { isTesterUser } from "../utils/usuarioUtils";
import { LocalStorageService } from "./localStorageService";

import type { Pessoa } from "../types/pessoas/Pessoa";
import type { DadosCadastroPessoaUsuario } from "../types/pessoas/DadosCadastroPessoaUsuario";
import type { DadosAtualizacaoPessoa } from "../types/pessoas/DadosAtualizacaoPessoa";

type PessoaResponse = {
    content: Pessoa[];
};

const local = new LocalStorageService<Pessoa>("pessoas_tester");

export async function listarPessoas(ativo?: boolean): Promise<Pessoa[]> {
    const response = await api.get<PessoaResponse>("/pessoas", {
        params: ativo !== undefined ? { ativo } : {},
    });
    const doBanco = response.data.content;

    if (!isTesterUser) {
        return doBanco;
    }

    const doLocal = local.listar();

    const mapa = new Map(doBanco.map(c => [c.id, c]));

    for (const departamento of doLocal) {
        mapa.set(departamento.id, departamento);
    }

    const mesclado = Array.from(mapa.values());
    return ativo !== undefined ? mesclado.filter(c => c.ativo === ativo) : mesclado;
}

export async function cadastrarPessoa(dados: DadosCadastroPessoaUsuario): Promise<Pessoa> {
    if (isTesterUser()) {
        const pessoaFake: Pessoa = {
            id: Date.now(),
            nome: dados.pessoa.nome,
            cpf: dados.pessoa.cpf,
            email: dados.pessoa.email,
            nomeCargo: "Cargo Tester",
            nomeDepartamento: "Departamento Tester",
            ativo: true,
            dataCadastro: new Date().toISOString(),
        };

        const pessoaSalva = local.salvar(pessoaFake);

        // Criação simples de usuário vinculado à pessoa
        const usuarios = JSON.parse(localStorage.getItem("usuarios_tester") || "[]");
        const novoUsuario = {
            id: Date.now(),
            email: pessoaFake.email,
            nomePessoa: pessoaFake.nome,
            idTipoUsuario: 4,
            tipoUsuario: "COMUM", // ✅ string simples, como o frontend espera
            ativo: true,
        };
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        return pessoaSalva;
    }

    const response = await api.post("/pessoas", dados);
    return response.data;
}

export async function atualizarPessoa(id: number, dados: DadosAtualizacaoPessoa): Promise<Pessoa> {
    if (isTesterUser()) {
        return local.atualizar(id, dados);
    }

    const response = await api.put(`/pessoas/${id}`, dados);
    return response.data;
}

export async function deletarPessoa(id: number) {
    if (isTesterUser()) {
        return local.atualizar(id, { ativo: false });
    }

    await api.delete(`/pessoas/${id}`);
}

export async function ativarPessoa(id: number) {
    if (isTesterUser()) {
        return local.atualizar(id, { ativo: true });
    }

    await api.put(`/pessoas/${id}/ativar`);
}
