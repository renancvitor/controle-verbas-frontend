import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../components/ui/Button";

import OrcamentoModal from "../components/orcamentos/OrcamentoModal";
import TabelaOrcamentos from "../components/orcamentos/TabelaOrcamentos";
import { listarOrcamentos, cadastrarOrcamento } from "../services/orcamentoService";
import type { DadosCadastroOrcamento } from "../types/orcamentos/DadosCadastroOrcamento";
import ModalAlterarSenha from "../components/usuarios/ModalAlterarSenha";

export interface Orcamento {
    id: number;
    fornecedor: string;
    descricao: string;
    formaPagamento: string;
    valorTotal: number;
    observacoesGerais: string;
    solicitanteNome: string;
    gestorNome: string | null;
    tesoureiroNome: string | null;
    status: string;
    dataCriacao: string;
    dataAnalise: string | null;
    verbaLiberada: string;
    dataLiberacaoVerba: string | null;
}

export default function Orcamentos() {
    const [modalAberto, setModalAberto] = useState(false);
    const [statusSelecionado, setStatusSelecionado] = useState<number | "">(1);
    const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
    const [modalSenhaAberto, setModalSenhaAberto] = useState(false);
    const [tipoUsuario, setTipoUsuario] = useState<string | null>(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(10);
    const navigate = useNavigate();

    const totalOrcamentos = orcamentos.length;
    const totalPaginas = Math.ceil(totalOrcamentos / itensPorPagina);

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = Math.min(indiceInicial + itensPorPagina, totalOrcamentos);

    const orcamentosExibidos = orcamentos.slice(indiceInicial, indiceFinal);

    const tipoUsuarioRaw = sessionStorage.getItem("tipoUsuario");
    let mostrarColunaAnalise = false;

    if (tipoUsuarioRaw) {
        try {
            const tipoUsuario = JSON.parse(tipoUsuarioRaw);
            mostrarColunaAnalise =
                tipoUsuario?.nomeTipoUsuario === "GESTOR" ||
                tipoUsuario?.nomeTipoUsuario === "TESOUREIRO";
        } catch (error) {
            toast.error("Erro ao interpretar tipoUsuario");
        }
    }

    const abrirModal = () => setModalAberto(true);
    const fecharModal = () => setModalAberto(false);

    async function handleCadastrar(dados: DadosCadastroOrcamento) {
        try {
            const dadosNormalizados = {
                ...dados,
                observacoesGerais: dados.observacoesGerais ?? "",
            };
            await cadastrarOrcamento(dadosNormalizados);
            fecharModal();
            const data = await listarOrcamentos();
            setOrcamentos(data);
        } catch (error) {
            toast.error("Erro ao cadastrar orçamento.");
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("tipoUsuario");
        navigate("/login");
    };

    const fetchOrcamentos = async () => {
        try {
            const data = await listarOrcamentos(
                statusSelecionado !== "" ? statusSelecionado : undefined
            );
            setOrcamentos(data);
        } catch (error) {
            toast.error("Erro ao buscar orçamentos.");
        }
    };

    const [usuarioLogadoId] = useState(() => {
        const tipoUsuarioRaw = sessionStorage.getItem("tipoUsuario");
        try {
            const tipoUsuario = tipoUsuarioRaw ? JSON.parse(tipoUsuarioRaw) : null;
            return tipoUsuario?.id ?? null;
        } catch (e) {
            return null;
        }
    });

    useEffect(() => {
        const tipoUsuarioRaw = sessionStorage.getItem("tipoUsuario");
        if (tipoUsuarioRaw) {
            try {
                const parsed = JSON.parse(tipoUsuarioRaw);
                setTipoUsuario(parsed?.nomeTipoUsuario ?? null);
            } catch (error) {
                toast.error("Erro ao interpretar tipoUsuario");
            }
        }
        fetchOrcamentos();
    }, [statusSelecionado]);

    return (
        <div className="min-h-screen w-full bg-gray-900 text-white px-6 py-6 flex flex-col items-center">
            <div className="w-full overflow-x-auto overflow-y-visible grow">
                <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h1 className="text-3xl font-bold">Controle Verbas</h1>
                    <div className="flex flex-wrap gap-3">
                        <Button onClick={() => setModalSenhaAberto(true)} variant="primary">
                            Alterar Senha
                        </Button>
                        <Button onClick={abrirModal} variant="success">
                            Novo Orçamento
                        </Button>
                        {tipoUsuario === "ADMIN" && (
                            <>
                                <Button onClick={() => navigate("/cargos")} variant="primary">
                                    Cargos
                                </Button>
                                <Button onClick={() => navigate("/departamentos")} variant="primary">
                                    Departamentos
                                </Button>
                                <Button onClick={() => navigate("/pessoas")} variant="primary">
                                    Pessoas
                                </Button>
                                <Button onClick={() => navigate("/usuarios")} variant="primary">
                                    Usuários
                                </Button>
                            </>
                        )}
                        <Button onClick={handleLogout} variant="danger">
                            Sair
                        </Button>
                    </div>
                </header>

                {modalSenhaAberto && (
                    <ModalAlterarSenha
                        usuarioId={usuarioLogadoId}
                        onClose={() => setModalSenhaAberto(false)}
                    />
                )}

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Filtrar por status:</label>
                    <select
                        value={statusSelecionado}
                        onChange={(e) => {
                            const value = e.target.value;
                            setStatusSelecionado(value === "" ? "" : Number(value));
                        }}
                        className="bg-gray-800 text-white p-2 rounded w-full md:w-64"
                    >
                        <option value="">Todos</option>
                        <option value={1}>Enviado</option>
                        <option value={2}>Aprovado</option>
                        <option value={3}>Reprovado</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="itensPorPagina" className="mr-2">Mostrar:</label>
                    <select
                        id="itensPorPagina"
                        value={itensPorPagina}
                        onChange={e => {
                            setItensPorPagina(Number(e.target.value));
                            setPaginaAtual(1);
                        }}
                        className="bg-gray-800 text-white p-2 rounded"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <p className="flex justify-center mt-2 text-sm text-gray-400">
                    Mostrando {indiceInicial + 1}–{indiceFinal} de {totalOrcamentos} orçamentos
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

                <div className="mt-2 overflow-auto rounded-lg border border-gray-700">
                    <TabelaOrcamentos
                        orcamentos={orcamentosExibidos}
                        onStatusChange={fetchOrcamentos}
                        mostrarColunaAnalise={mostrarColunaAnalise}
                    />
                </div>

                <div className="flex justify-center items-center gap-4 mt-2">
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

                <OrcamentoModal
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    onSubmit={handleCadastrar}
                />
            </div>
        </div>
    );
}
