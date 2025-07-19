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
                            <th className="border border-gray-300 p-2 w-[160px]">Fornecedor</th>
                            <th className="border border-gray-300 p-2 w-[200px]">Descrição</th>
                            <th className="border border-gray-300 p-2 w-[80px]">Valor Total</th>
                            <th className="border border-gray-300 p-2 w-[130px]">Forma de Pagamento</th>
                            <th className="border border-gray-300 p-2 w-[160px]">Observações</th>
                            <th className="border border-gray-300 p-2 w-[90px]">Data de Criação</th>
                            <th className="border border-gray-300 p-2 w-[130px]">Solicitante</th>
                            <th className="border border-gray-300 p-2 w-[90px]">Data de Análise</th>
                            <th className="border border-gray-300 p-2 w-[130px]">Gestor</th>
                            <th className="border border-gray-300 p-2 w-[90px]">Data Liberação Verba</th>
                            <th className="border border-gray-300 p-2 w-[130px]">Tesoureiro</th>
                            <th className="border border-gray-300 p-2 w-[75px]">Status</th>
                            <th className="border border-gray-300 p-2 w-[80px]">Verba Liberada</th>
                            {mostrarColunaAnalise && (
                                <th className="border border-gray-300 p-2 w-[100px]">Analisar</th>
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
