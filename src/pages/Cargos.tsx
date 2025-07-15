import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
    listarCargos,
    cadastrarCargo,
    atualizarCargo,
    deletarCargo,
    ativarCargo,
} from "../services/cargoService";

import type { Cargo } from "../types/Cargo";
import type { DadosAtualizacaoCargo } from "../types/DadosAtualizacaoCargo";
import Button from "../components/ui/Button";

export default function Cargos() {
    const [cargos, setCargos] = useState<Cargo[]>([]);
    const [novoCargo, setNovoCargo] = useState("");
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nomeEditado, setNomeEditado] = useState("");
    const [filtroAtivo, setFiltroAtivo] = useState<string>("todos");

    const navigate = useNavigate();

    useEffect(() => {
        buscarCargos();
    }, [filtroAtivo]);

    const buscarCargos = async () => {
        try {
            let ativoParam: boolean | undefined;
            if (filtroAtivo === "ativos") ativoParam = true;
            else if (filtroAtivo === "inativos") ativoParam = false;
            else ativoParam = undefined;

            const data = await listarCargos(ativoParam);
            setCargos(data);
        } catch {
            toast.error("Erro ao buscar cargos");
        }
    };

    const handleCadastrar = async () => {
        if (!novoCargo.trim()) {
            toast.warn("Digite o nome do cargo.");
            return;
        }

        try {
            await cadastrarCargo({ nome: novoCargo });
            setNovoCargo("");
            buscarCargos();
            toast.success("Cargo cadastrado com sucesso!");
        } catch {
            toast.error("Erro ao cadastrar cargo.");
        }
    };

    const iniciarEdicao = (cargo: Cargo) => {
        setEditandoId(cargo.id);
        setNomeEditado(cargo.nome);
    };

    const cancelarEdicao = () => {
        setEditandoId(null);
        setNomeEditado("");
    };

    const salvarEdicao = async (id: number) => {
        if (!nomeEditado.trim()) {
            toast.warn("Nome não pode ser vazio.");
            return;
        }
        try {
            await atualizarCargo(id, { nome: nomeEditado });
            toast.success("Cargo atualizado com sucesso!");
            setEditandoId(null);
            setNomeEditado("");
            buscarCargos();
        } catch {
            toast.error("Erro ao atualizar cargo.");
        }
    };

    const handleDeletar = async (id: number) => {
        try {
            await deletarCargo(id);
            toast.success("Cargo desativado com sucesso!");
            buscarCargos();
        } catch {
            toast.error("Erro ao desativar cargo.");
        }
    };

    const handleAtivar = async (id: number) => {
        try {
            await ativarCargo(id);
            toast.success("Cargo ativado com sucesso!");
            buscarCargos();
        } catch {
            toast.error("Erro ao ativar cargo.");
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Cargos</h1>
                    <Button variant="danger" onClick={() => navigate(-1)}>
                        Voltar
                    </Button>
                </div>

                <div className="mb-6">
                    <label htmlFor="filtro" className="mr-2">Filtrar:</label>
                    <select
                        id="filtro"
                        value={filtroAtivo}
                        onChange={(e) => setFiltroAtivo(e.target.value)}
                        className="bg-gray-800 text-white p-2 rounded"
                    >
                        <option value="todos">Todos</option>
                        <option value="ativos">Ativos</option>
                        <option value="inativos">Inativos</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={novoCargo}
                        onChange={(e) => setNovoCargo(e.target.value)}
                        placeholder="Nome do cargo"
                        className="flex-1 p-2 rounded bg-gray-800 text-white"
                    />
                    <Button variant="primary" onClick={handleCadastrar}>
                        Cadastrar
                    </Button>
                </div>

                <table className="w-full border border-gray-700 rounded-lg">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="border border-gray-700 p-2 text-left">Nome</th>
                            <th className="border border-gray-700 p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargos.map((cargo) => (
                            <tr key={cargo.id} className="hover:bg-gray-800">
                                <td className="border border-gray-700 p-2">
                                    {editandoId === cargo.id ? (
                                        <input
                                            type="text"
                                            value={nomeEditado}
                                            onChange={(e) => setNomeEditado(e.target.value)}
                                            className="w-full p-1 rounded bg-gray-800 text-white"
                                        />
                                    ) : (
                                        cargo.nome
                                    )}
                                </td>
                                <td className="border border-gray-700 p-2 text-center space-x-2">
                                    {editandoId === cargo.id ? (
                                        <>
                                            <Button variant="success" onClick={() => salvarEdicao(cargo.id)}>
                                                Salvar
                                            </Button>
                                            <Button variant="danger" onClick={cancelarEdicao}>
                                                Cancelar
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button className="w-20" variant="primary" onClick={() => iniciarEdicao(cargo)}>
                                                Editar
                                            </Button>


                                            {cargo.ativo ? (
                                                <Button className="w-24" variant="danger" onClick={() => handleDeletar(cargo.id)}>
                                                    Desativar
                                                </Button>
                                            ) : (
                                                <Button className="w-24" variant="success" onClick={() => handleAtivar(cargo.id)}>
                                                    Ativar
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
