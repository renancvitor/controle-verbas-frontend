import { useEffect, useState } from "react";
import TabelaOrcamentos from "../components/orcamentos/TabelaOrcamentos";

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
        const token = sessionStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8080/orcamentos", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar orçamentos.");
            }

            const data = await response.json();
            setOrcamentos(data.content);
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
            {/* Passa a função para que TabelaOrcamentos e LinhaOrcamento possam usá-la */}
            <TabelaOrcamentos orcamentos={orcamentos} onStatusChange={fetchOrcamentos} />
        </div>
    );
}
