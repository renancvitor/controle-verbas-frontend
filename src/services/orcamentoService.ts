import api from "./api";
import type { Orcamento } from "../pages/Orcamentos";

type OrcamentoResponse = {
    content: Orcamento[];
};

export async function listarOrcamentos(): Promise<Orcamento[]> {
    const response = await api.get<OrcamentoResponse>("/orcamentos");
    return response.data.content;
}

export async function aprovarOrcamento(id: number) {
    await api.put(`/orcamentos/${id}/aprovar`);
}

export async function reprovarOrcamento(id: number) {
    await api.put(`/orcamentos/${id}/reprovar`);
}
