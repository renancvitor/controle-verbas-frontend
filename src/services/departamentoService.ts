import api from "./api";
import type { Departamento } from "../types/departamentos/Departamento";
import type { DadosAtualizacaoDepartamento } from "../types/departamentos/DadosAtualizacaoDepartamento";
import type { DadosCadastroDepartamento } from "../types/departamentos/DadosCadastroDepartamento";

type DepartamentoResponse = {
    content: Departamento[];
};

export async function listarDepartamentos(ativo?: boolean): Promise<Departamento[]> {
    const params = ativo !== undefined ? { ativo } : {};
    const response = await api.get<DepartamentoResponse>("/departamentos", { params });
    return response.data.content;
}

export async function cadastrarDepartamento(dados: DadosCadastroDepartamento) {
    const response = await api.post("/departamentos", dados);
    return response.data;
}

export async function atualizarDepartamento(id: number, dados: DadosAtualizacaoDepartamento) {
    const response = await api.put(`/departamentos/${id}`, dados);
    return response.data;
}

export async function deletarDepartamento(id: number) {
    await api.delete(`/departamentos/${id}`);
}

export async function ativarDepartamento(id: number) {
    await api.put(`/departamentos/${id}/ativar`);
}