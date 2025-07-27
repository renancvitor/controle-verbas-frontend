import api from "./api";
import { isTesterUser } from "../utils/usuarioUtils";
import { LocalStorageService } from "./localStorageService";

import type { Cargo } from "../types/cargos/Cargo";
import type { DadosCadastroCargo } from "../types/cargos/DadosCadastroCargo";
import type { DadosAtualizacaoCargo } from "../types/cargos/DadosAtualizacaoCargo";

type CargoResponse = {
    content: Cargo[];
};

const local = new LocalStorageService<Cargo>("cargos_tester");

export async function listarCargos(ativo?: boolean): Promise<Cargo[]> {
    const params = ativo !== undefined ? { ativo } : {};
    const response = await api.get<CargoResponse>("/cargos", { params });
    const doBanco = response.data.content;

    if (!isTesterUser()) {
        return doBanco;
    }

    const doLocal = local.listar();

    // Cria um Map com os dados do banco (chave: id)
    const mapa = new Map(doBanco.map(c => [c.id, c]));

    // Substitui ou adiciona os do localStorage
    for (const cargo of doLocal) {
        mapa.set(cargo.id, cargo); // sobrescreve se já existir ou adiciona se for novo
    }

    // Retorna os cargos filtrados por ativo, se necessário
    const mesclado = Array.from(mapa.values());
    return ativo !== undefined ? mesclado.filter(c => c.ativo === ativo) : mesclado;
}

export async function cadastrarCargo(dados: DadosCadastroCargo): Promise<Cargo> {
    if (isTesterUser()) {
        return local.salvar({ ...dados, ativo: true });
    }

    const response = await api.post("/cargos", dados);
    return response.data;
}

export async function atualizarCargo(id: number, dados: DadosAtualizacaoCargo): Promise<Cargo> {
    if (isTesterUser()) {
        return local.atualizar(id, dados);
    }

    const response = await api.put(`/cargos/${id}`, dados);
    return response.data;
}

export async function deletarCargo(id: number) {
    if (isTesterUser()) {
        // "Desativa" o cargo localmente
        return local.atualizar(id, { ativo: false });
    }

    await api.delete(`/cargos/${id}`);
}

export async function ativarCargo(id: number) {
    if (isTesterUser()) {
        // Ativa o cargo localmente, atualizando o campo 'ativo'
        return local.atualizar(id, { ativo: true });
    }

    await api.put(`/cargos/${id}/ativar`);
}