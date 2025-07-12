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

    useEffect(() => {
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
                setOrcamentos(data.content); // lembra que a API retorna dentro de 'content'
            } catch (error) {
                console.error("Erro ao buscar orçamentos:", error);
                alert("Erro ao buscar orçamentos.");
            }
        };

        fetchOrcamentos();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <h1 className="text-3xl font-bold mb-6">Lista de Orçamentos</h1>
            <TabelaOrcamentos orcamentos={orcamentos} />
        </div>
    );
}
