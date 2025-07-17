import LinhaOrcamento from "./LinhaOrcamento";
import type { Orcamento } from "../../pages/Orcamentos";

type TabelaProps = {
    orcamentos: Orcamento[];
    onStatusChange: () => void;
    mostrarColunaAnalise?: boolean;
};

export default function TabelaOrcamentos({
    orcamentos,
    onStatusChange,
    mostrarColunaAnalise
}: TabelaProps) {
    if (orcamentos.length === 0) {
        return <p className="text-gray-700">Nenhum orçamento encontrado.</p>;
    }

    return (
        <div className="w-full">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-700 shadow rounded-lg bg-gray-900 text-sm">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Fornecedor</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Descrição</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Valor Total</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Forma de Pagamento</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Observações</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Data de Criação</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Solicitante</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Data de Análise</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Gestor</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Data Liberação Verba</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Tesoureiro</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Status</th>
                            <th className="border border-gray-300 p-2 whitespace-nowrap">Verba Liberada</th>
                            {mostrarColunaAnalise && (
                                <th className="border border-gray-300 p-2 whitespace-nowrap">Analisar</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {orcamentos.map((orcamento) => (
                            <LinhaOrcamento
                                key={orcamento.id}
                                orcamento={orcamento}
                                onStatusChange={onStatusChange}
                                mostrarColunaAnalise={mostrarColunaAnalise}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
