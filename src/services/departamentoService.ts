import api from "./api";
import { isTesterUser } from "../utils/usuarioUtils";
import { LocalStorageService } from "./localStorageService";

import type { Departamento } from "../types/departamentos/Departamento";
import type { DadosAtualizacaoDepartamento } from "../types/departamentos/DadosAtualizacaoDepartamento";
import type { DadosCadastroDepartamento } from "../types/departamentos/DadosCadastroDepartamento";

type DepartamentoResponse = {
    content: Departamento[];
};

const local = new LocalStorageService<Departamento>("departamentos_tester");

export async function listarDepartamentos(ativo?: boolean): Promise<Departamento[]> {
    const params = ativo !== undefined ? { ativo } : {};
    const response = await api.get<DepartamentoResponse>("/departamentos", { params });
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

export async function cadastrarDepartamento(dados: DadosCadastroDepartamento): Promise<Departamento> {
    if (isTesterUser()) {
        return local.salvar({ ...dados, ativo: true });
    }

    const response = await api.post("/departamentos", dados);
    return response.data;
}

export async function atualizarDepartamento(id: number, dados: DadosAtualizacaoDepartamento): Promise<Departamento> {
    if (isTesterUser()) {
        return local.atualizar(id, dados);
    }

    const response = await api.put(`/departamentos/${id}`, dados);
    return response.data;
}

export async function deletarDepartamento(id: number) {
    if (isTesterUser()) {
        return local.atualizar(id, { ativo: false });
    }

    await api.delete(`/departamentos/${id}`);
}

export async function ativarDepartamento(id: number) {
    if (isTesterUser()) {
        return local.atualizar(id, { ativo: true });
    }

    await api.put(`/departamentos/${id}/ativar`);
}