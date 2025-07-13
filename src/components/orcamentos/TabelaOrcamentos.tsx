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
        <div className="w-full overflow-x-auto md:overflow-x-visible">
            <table className="w-full table-auto border-collapse border border-gray-700 shadow rounded-lg bg-gray-900 text-sm break-words">
                <thead className="bg-gray-800 text-sm">
                    <tr>
                        <th className="border border-gray-300 p-2">Fornecedor</th>
                        <th className="border border-gray-300 p-2">Descrição</th>
                        <th className="border border-gray-300 p-2">Valor Total</th>
                        <th className="border border-gray-300 p-2">Forma de Pagamento</th>
                        <th className="border border-gray-300 p-2">Observações</th>
                        <th className="border border-gray-300 p-2">Data de Criação</th>
                        <th className="border border-gray-300 p-2">Solicitante</th>
                        <th className="border border-gray-300 p-2">Data de Análise</th>
                        <th className="border border-gray-300 p-2">Gestor</th>
                        <th className="border border-gray-300 p-2">Data Liberação Verba</th>
                        <th className="border border-gray-300 p-2">Tesoureiro</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Verba Liberada</th>
                        {mostrarColunaAnalise && (
                            <th className="border border-gray-300 p-2 w-40">Analisar</th>
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
    );
}
