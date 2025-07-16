import api from "./api";
import type { Pessoa } from "../types/pessoas/Pessoa";
import type { DadosCadastroPessoaUsuario } from "../types/pessoas/DadosCadastroPessoaUsuario";
import type { DadosAtualizacaoPessoa } from "../types/pessoas/DadosAtualizacaoPessoa";

type PessoaResponse = {
    content: Pessoa[];
};

export async function listarPessoas(ativo?: boolean): Promise<Pessoa[]> {
    const response = await api.get<PessoaResponse>("/pessoas", {
        params: ativo !== undefined ? { ativo } : {},
    });
    return response.data.content;
}

export async function cadastrarPessoa(dados: DadosCadastroPessoaUsuario) {
    const response = await api.post("/pessoas", dados);
    return response.data;
}

export async function atualizarPessoa(id: number, dados: DadosAtualizacaoPessoa) {
    const response = await api.put(`/pessoas/${id}`, dados);
    return response.data;
}

export async function deletarPessoa(id: number) {
    await api.delete(`/pessoas/${id}`);
}

export async function ativarPessoa(id: number) {
    await api.put(`/pessoas/${id}/ativar`);
}
