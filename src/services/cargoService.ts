import api from "./api";
import type { Cargo } from "../types/cargos/Cargo";
import type { DadosCadastroCargo } from "../types/cargos/DadosCadastroCargo";
import type { DadosAtualizacaoCargo } from "../types/cargos/DadosAtualizacaoCargo";

type CargoResponse = {
    content: Cargo[];
};

export async function listarCargos(ativo?: boolean): Promise<Cargo[]> {
    const params = ativo !== undefined ? { ativo } : {};
    const response = await api.get<CargoResponse>("/cargos", { params });
    return response.data.content;
}

export async function cadastrarCargo(dados: DadosCadastroCargo) {
    const response = await api.post("/cargos", dados);
    return response.data;
}

export async function atualizarCargo(id: number, dados: DadosAtualizacaoCargo) {
    const response = await api.put(`/cargos/${id}`, dados);
    return response.data;
}

export async function deletarCargo(id: number) {
    await api.delete(`/cargos/${id}`);
}

export async function ativarCargo(id: number) {
    await api.put(`/cargos/${id}/ativar`);
}