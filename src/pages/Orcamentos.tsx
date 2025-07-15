import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../components/ui/Button";

import OrcamentoModal from "../components/orcamentos/OrcamentoModal";
import TabelaOrcamentos from "../components/orcamentos/TabelaOrcamentos";
import { listarOrcamentos, cadastrarOrcamento } from "../services/orcamentoService";
import type { DadosCadastroOrcamento } from "../types/orcamentos/DadosCadastroOrcamento";

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
    const [statusSelecionado, setStatusSelecionado] = useState<number | "">("");
    const [orcamentos, setOrcamentos] = useState<Orcamento[]>([]);
    const navigate = useNavigate();

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

    useEffect(() => {
        console.log("Status selecionado:", statusSelecionado);
        fetchOrcamentos();
    }, [statusSelecionado]);

    return (
        <div className="min-h-screen bg-gray-900 p-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Controle Verbas</h1>
                <div className="flex gap-4">
                    <Button onClick={abrirModal} variant="success">
                        Novo Orçamento
                    </Button>
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
                    <Button onClick={handleLogout} variant="danger">
                        Sair
                    </Button>
                </div>
            </div>
            <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Filtrar por status:</label>
                <select
                    value={statusSelecionado}
                    onChange={(e) => {
                        const value = e.target.value;
                        setStatusSelecionado(value === "" ? "" : Number(value));
                    }}
                    className="bg-gray-800 text-white p-2 rounded"
                >
                    <option value="">Todos</option>
                    <option value={1}>Enviado</option>
                    <option value={2}>Aprovado</option>
                    <option value={3}>Reprovado</option>
                </select>
            </div>
            <TabelaOrcamentos
                orcamentos={orcamentos}
                onStatusChange={fetchOrcamentos}
                mostrarColunaAnalise={mostrarColunaAnalise}
            />
            <OrcamentoModal isOpen={modalAberto} onClose={() => setModalAberto(false)} onSubmit={handleCadastrar} />
        </div>
    );
}
