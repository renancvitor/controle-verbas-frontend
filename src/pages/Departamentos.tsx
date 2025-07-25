import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import DepartamentoForm from "../components/departamentos/DepartamentoForm";
import FiltroDepartamentos from "../components/departamentos/FiltroDepartamentos";
import TabelaDepartamentos from "../components/departamentos/TabelaDepartamentos";

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
    const [filtroAtivo, setFiltroAtivo] = useState<string>("ativos");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(10);
    const navigate = useNavigate();

    const totalDepartamentos = departamentos.length;
    const totalPaginas = Math.ceil(totalDepartamentos / itensPorPagina);

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = Math.min(indiceInicial + itensPorPagina, totalDepartamentos);

    const departamentosExibidos = departamentos.slice(indiceInicial, indiceFinal);

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
        <div className="min-h-screen w-full bg-gray-900 text-white px-6 py-6 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Departamentos</h1>
                    <Button variant="pageable" onClick={() => navigate(-1)}>Voltar</Button>
                </div>
                <FiltroDepartamentos
                    filtro={filtroAtivo}
                    onChange={setFiltroAtivo}
                    itensPorPagina={itensPorPagina}
                    onChangeItensPorPagina={(valor) => {
                        setItensPorPagina(valor);
                        setPaginaAtual(1);
                    }} />

                <DepartamentoForm nome={novoDepartamento} onChange={setNovoDepartamento} onSubmit={handleCadastrar} />

                <p className="flex justify-center mt-2 text-sm text-gray-400">
                    Mostrando {indiceInicial + 1}–{indiceFinal} de {totalDepartamentos} departamentos
                </p>

                <div className="flex justify-center items-center gap-4 mt-4">
                    <Button
                        variant="pageable"
                        disabled={paginaAtual === 1}
                        onClick={() => {
                            if (paginaAtual > 1) {
                                setPaginaAtual(paginaAtual - 1);
                            }
                        }}
                    >
                        Anterior
                    </Button>
                    <span>
                        Página {paginaAtual} de {totalPaginas}
                    </span>

                    <Button
                        variant="pageable"
                        disabled={paginaAtual === totalPaginas}
                        onClick={() => {
                            if (paginaAtual < totalPaginas) {
                                setPaginaAtual(paginaAtual + 1);
                            }
                        }}
                    >
                        Próxima
                    </Button>
                </div>

                <TabelaDepartamentos
                    departamentos={departamentosExibidos}
                    editandoId={editandoId}
                    nomeEditado={nomeEditado}
                    onEditar={iniciarEdicao}
                    onChangeNomeEditado={setNomeEditado}
                    onSalvar={salvarEdicao}
                    onCancelar={cancelarEdicao}
                    onAtivar={handleAtivar}
                    onDesativar={handleDeletar}
                />

                <div className="flex justify-center items-center gap-4 mt-4">
                    <Button
                        variant="pageable"
                        disabled={paginaAtual === 1}
                        onClick={() => {
                            if (paginaAtual > 1) {
                                setPaginaAtual(paginaAtual - 1);
                            }
                        }}
                    >
                        Anterior
                    </Button>
                    <span>
                        Página {paginaAtual} de {totalPaginas}
                    </span>

                    <Button
                        variant="pageable"
                        disabled={paginaAtual === totalPaginas}
                        onClick={() => {
                            if (paginaAtual < totalPaginas) {
                                setPaginaAtual(paginaAtual + 1);
                            }
                        }}
                    >
                        Próxima
                    </Button>
                </div>
            </div>
        </div>
    );
}