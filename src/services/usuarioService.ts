import api from "./api";
import { isTesterUser } from "../utils/usuarioUtils";
import { LocalStorageService } from "./localStorageService";

import type { DadosAtualizacaoUsuarioTipo, Usuario } from "../types/usuarios/Usuario";
import type { DadosAtualizacaoUsuarioSenha } from "../types/usuarios/DadosAtualizacaoUsuarioSenha";

const local = new LocalStorageService<Usuario>("usuarios_service");

export const listarUsuarios = async (ativo?: boolean): Promise<Usuario[]> => {
    const response = await api.get("/usuarios", {
        params: ativo !== undefined ? { ativo } : {},
    });
    const doBanco: Usuario[] = response.data.content;

    if (!isTesterUser()) {
        return doBanco;
    }

    const doLocal: Usuario[] = local.listar();

    // Mescla as duas listas garantindo que usuários do local sobrescrevam os do backend pelo id
    const mapa = new Map<number, Usuario>();

    doBanco.forEach(u => mapa.set(u.id, u));
    doLocal.forEach(u => mapa.set(u.id, u));

    // Aplica filtro 'ativo' se passado, caso contrário retorna todos
    const listaMesclada = Array.from(mapa.values());
    if (ativo !== undefined) {
        return listaMesclada.filter(u => u.ativo === ativo);
    }
    return listaMesclada;
};

export const atualizarSenhaUsuario = async (
    id: number,
    dados: DadosAtualizacaoUsuarioSenha
) => {
    const response = await api.put(`/usuarios/${id}/senha`, dados);
    return response.data;
};

export const atualizarTipoUsuario = async (id: number, dados: DadosAtualizacaoUsuarioTipo) => {
    return api.put(`/usuarios/tipo/${id}`, dados);
};

export const deletarUsuario = async (id: number) => {
    if (isTesterUser()) {
        return local.atualizar(id, { ativo: false });
    }

    return api.delete(`/usuarios/${id}`);
};

export const ativarUsuario = async (id: number) => {
    if (isTesterUser()) {
        return local.atualizar(id, { ativo: true });
    }

    return api.put(`/usuarios/${id}/ativar`);
};
