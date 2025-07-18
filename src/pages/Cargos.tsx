import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import FiltroCargos from "../components/cargos/FiltroCargos";
import CargoForm from "../components/cargos/CargoForm";
import TabelaCargos from "../components/cargos/TabelaCargos";

import {
    listarCargos,
    cadastrarCargo,
    atualizarCargo,
    deletarCargo,
    ativarCargo,
} from "../services/cargoService";

import type { Cargo } from "../types/cargos/Cargo";
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
                    <Button variant="danger" onClick={() => navigate(-1)}>Voltar</Button>
                </div>
                <FiltroCargos filtro={filtroAtivo} onChange={setFiltroAtivo} />
                <CargoForm nome={novoCargo} onChange={setNovoCargo} onSubmit={handleCadastrar} />
                <TabelaCargos
                    cargos={cargos}
                    editandoId={editandoId}
                    nomeEditado={nomeEditado}
                    onEditar={iniciarEdicao}
                    onChangeNomeEditado={setNomeEditado}
                    onSalvar={salvarEdicao}
                    onCancelar={cancelarEdicao}
                    onAtivar={handleAtivar}
                    onDesativar={handleDeletar}
                />
            </div>
        </div>
    );
}
