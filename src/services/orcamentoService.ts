import api from "./api";

import { isTesterUser } from "../utils/usuarioUtils";
import { LocalStorageOrcamentoService } from "./localStorageOrcamentoService";
import type { Orcamento } from "../pages/Orcamentos";

type OrcamentoResponse = {
    content: Orcamento[];
};

const localOrcamentos = new LocalStorageOrcamentoService();

export async function listarOrcamentos(statusId?: number | ""): Promise<Orcamento[]> {
    if (isTesterUser()) {
        // Pega dados do banco com filtro
        const params = typeof statusId === "number" ? { statusId } : {};
        const response = await api.get<OrcamentoResponse>("/orcamentos", { params });
        const doBanco = response.data.content;

        // Pega dados do localStorage SEM FILTRO
        const doLocal = localOrcamentos.listar();

        // Mescla por id (priorizando localStorage)
        const mapa = new Map<number, Orcamento>();
        doBanco.forEach(o => mapa.set(o.id, o));
        doLocal.forEach(o => mapa.set(o.id, o));

        // Retorna mesclado sem filtro
        return Array.from(mapa.values());
    }

    // Usuário normal: busca direto do banco com filtro
    const params = typeof statusId === "number" ? { statusId } : {};
    const response = await api.get<OrcamentoResponse>("/orcamentos", { params });
    return response.data.content;
}

export async function aprovarOrcamento(id: number): Promise<void> {
    if (isTesterUser()) {
        localOrcamentos.aprovar(id);
        return;
    }
    await api.put(`/orcamentos/${id}/aprovar`);
}

export async function reprovarOrcamento(id: number): Promise<void> {
    if (isTesterUser()) {
        localOrcamentos.reprovar(id);
        return;
    }
    await api.put(`/orcamentos/${id}/reprovar`);
}

export async function liberarVerba(id: number): Promise<void> {
    if (isTesterUser()) {
        localOrcamentos.liberarVerba(id);
        return;
    }
    await api.put(`/orcamentos/${id}/liberar_verba`);
}

export async function cadastrarOrcamento(dados: Omit<Orcamento,
    "id" |
    "solicitanteNome" |
    "gestorNome" |
    "tesoureiroNome" |
    "status" |
    "dataCriacao" |
    "dataAnalise" |
    "verbaLiberada" |
    "dataLiberacaoVerba">) {
    if (isTesterUser()) {
        const novoOrcamento = {
            ...dados,
            status: "ENVIADO TESTE",
            solicitanteNome: "Tester",
            gestorNome: null,
            tesoureiroNome: null,
            dataCriacao: new Date().toISOString(),
            dataAnalise: null,
            verbaLiberada: "Não",
            dataLiberacaoVerba: null,
        };
        return localOrcamentos.salvar(novoOrcamento);
    }
    const response = await api.post("/orcamentos", dados);
    return response.data;
}
