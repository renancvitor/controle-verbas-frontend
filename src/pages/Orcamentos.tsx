import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TabelaOrcamentos from "../components/orcamentos/TabelaOrcamentos";
import { listarOrcamentos } from "../services/orcamentoService";

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
        } catch (e) {
            console.error("Erro ao interpretar tipoUsuario", e);
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
            console.error("Erro ao buscar orçamentos:", error);
            alert("Erro ao buscar orçamentos.");
        }
    };

    useEffect(() => {
        fetchOrcamentos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 p-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Lista de Orçamentos</h1>
                <Button onClick={handleLogout} variant="danger">
                    Sair
                </Button>
            </div>
            <TabelaOrcamentos
                orcamentos={orcamentos}
                onStatusChange={fetchOrcamentos}
                mostrarColunaAnalise={mostrarColunaAnalise}
            />
        </div>
    );
}
