import { useEffect, useState } from "react";
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
        <div className="min-h-screen bg-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-6">Lista de Orçamentos</h1>
            <TabelaOrcamentos orcamentos={orcamentos} onStatusChange={fetchOrcamentos} />
        </div>
    );
}
