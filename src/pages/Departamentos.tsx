import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
    listarDepartamentos,
    cadastrarDepartamento,
    atualizarDepartamento,
    deletarDepartamento,
    ativarDepartamento,
} from "../services/departamentoService";

import type { Departamento } from "../types/departamentos/Departamento";
import Button from "../components/ui/Button";

export default function Departamento() {
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [novoDepartamento, setNovoDepartamento] = useState("");
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nomeEditado, setNomeEditado] = useState("");
    const [filtroAtivo, setFiltroAtivo] = useState<string>("todos");

    const navigate = useNavigate();

    useEffect(() => {
        buscarDepartamentos();
    }, [filtroAtivo]);

    const buscarDepartamentos = async () => {
        try {
            let ativoParam: boolean | undefined;
            if (filtroAtivo === "ativos") ativoParam = true;
            else if (filtroAtivo === "inativos") ativoParam = false;
            else ativoParam = undefined;

            const data = await listarDepartamentos(ativoParam);
            setDepartamentos(data);
        } catch {
            toast.error("Erro ao buscar departamentos");
        }
    };

    const handleCadastrar = async () => {
        if (!novoDepartamento.trim()) {
            toast.warn("Digite o nome do departamento.");
            return;
        }

        try {
            await cadastrarDepartamento({ nome: novoDepartamento });
            setNovoDepartamento("");
            buscarDepartamentos();
            toast.success("Departamento cadastrado com sucesso!");
        } catch {
            toast.error("Erro ao cadastrar departamento.");
        }
    };

    const iniciarEdicao = (departamento: Departamento) => {
        setEditandoId(departamento.id);
        setNomeEditado(departamento.nome);
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
            await atualizarDepartamento(id, { nome: nomeEditado });
            toast.success("Departamento atualizado com sucesso!");
            setEditandoId(null);
            setNomeEditado("");
            buscarDepartamentos();
        } catch {
            toast.error("Erro ao atualizar departamento.");
        }
    };

    const handleDeletar = async (id: number) => {
        try {
            await deletarDepartamento(id);
            toast.success("Departamento desativado com sucesso!");
            buscarDepartamentos();
        } catch {
            toast.error("Erro ao desativar departamento.");
        }
    };

    const handleAtivar = async (id: number) => {
        try {
            await ativarDepartamento(id);
            toast.success("Departamento ativado com sucesso!");
            buscarDepartamentos();
        } catch {
            toast.error("Erro ao ativar departamento.");
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Departamentos</h1>
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
                        value={novoDepartamento}
                        onChange={(e) => setNovoDepartamento(e.target.value)}
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
                        {departamentos.map((departamento) => (
                            <tr key={departamento.id} className="hover:bg-gray-800">
                                <td className="border border-gray-700 p-2">
                                    {editandoId === departamento.id ? (
                                        <input
                                            type="text"
                                            value={nomeEditado}
                                            onChange={(e) => setNomeEditado(e.target.value)}
                                            className="w-full p-1 rounded bg-gray-800 text-white"
                                        />
                                    ) : (
                                        departamento.nome
                                    )}
                                </td>
                                <td className="border border-gray-700 p-2 text-center space-x-2">
                                    {editandoId === departamento.id ? (
                                        <>
                                            <Button variant="success" onClick={() => salvarEdicao(departamento.id)}>
                                                Salvar
                                            </Button>
                                            <Button variant="danger" onClick={cancelarEdicao}>
                                                Cancelar
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button className="w-20" variant="primary" onClick={() => iniciarEdicao(departamento)}>
                                                Editar
                                            </Button>


                                            {departamento.ativo ? (
                                                <Button className="w-24" variant="danger" onClick={() => handleDeletar(departamento.id)}>
                                                    Desativar
                                                </Button>
                                            ) : (
                                                <Button className="w-24" variant="success" onClick={() => handleAtivar(departamento.id)}>
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