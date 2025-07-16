import api from "./api";
import type { DadosAtualizacaoUsuarioTipo, Usuario } from "../types/usuarios/Usuario";

export const listarUsuarios = async (ativo?: boolean): Promise<Usuario[]> => {
    const response = await api.get("/usuarios", {
        params: ativo !== undefined ? { ativo } : {},
    });
    return response.data.content;
};

export const atualizarTipoUsuario = async (id: number, dados: DadosAtualizacaoUsuarioTipo) => {
    return api.put(`/usuarios/tipo/${id}`, dados);
};

export const deletarUsuario = async (id: number) => {
    return api.delete(`/usuarios/${id}`);
};

export const ativarUsuario = async (id: number) => {
    return api.put(`/usuarios/${id}/ativar`);
};
