import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../components/Button";

import OrcamentoModal from "../components/orcamentos/OrcamentoModal";
import TabelaOrcamentos from "../components/orcamentos/TabelaOrcamentos";
import { listarOrcamentos, cadastrarOrcamento } from "../services/orcamentoService";
import type { DadosCadastroOrcamento } from "../types/DadosCadastroOrcamento";

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
        navigate("/login");
    };

    const fetchOrcamentos = async () => {
        try {
            const data = await listarOrcamentos();
            setOrcamentos(data);
        } catch (error) {
            toast.error("Erro ao buscar orçamentos.");
        }
    };

    useEffect(() => {
        fetchOrcamentos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 p-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Lista de Orçamentos</h1>
                <div className="flex gap-4">
                    <Button onClick={abrirModal} variant="primary">
                        Novo Orçamento
                    </Button>
                    <Button onClick={handleLogout} variant="danger">
                        Sair
                    </Button>
                </div>
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
