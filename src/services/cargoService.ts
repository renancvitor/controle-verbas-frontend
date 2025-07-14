import api from "./api";
import type { Cargo } from "../types/Cargo";
import type { DadosCadastroCargo } from "../types/DadosCadastroCargo";

type CargoResponse = {
    content: Cargo[];
};

export async function listarCargos(): Promise<Cargo[]> {
    const response = await api.get<CargoResponse>("/cargos");
    return response.data.content;
}

export async function cadastrarCargo(dados: DadosCadastroCargo) {
    const response = await api.post("/cargos", dados);
    return response.data;
}
