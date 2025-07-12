import LinhaOrcamento from "./LinhaOrcamento";
import type { Orcamento } from "../../pages/Orcamentos";

type TabelaProps = {
    orcamentos: Orcamento[];
};

export default function TabelaOrcamentos({ orcamentos }: TabelaProps) {
    if (orcamentos.length === 0) {
        return <p className="text-gray-700">Nenhum orçamento encontrado.</p>;
    }

    return (
        <table className="min-w-full border-collapse border border-gray-700 shadow rounded-lg bg-gray-900 text-white">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="border border-gray-300 p-2">Descrição</th>
                    <th className="border border-gray-300 p-2">Fornecedor</th>
                    <th className="border border-gray-300 p-2">Forma de Pagamento</th>
                    <th className="border border-gray-300 p-2">Valor Total</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Solicitante</th>
                    <th className="border border-gray-300 p-2">Gestor</th>
                    <th className="border border-gray-300 p-2">Tesoureiro</th>
                    <th className="border border-gray-300 p-2">Data de Criação</th>
                    <th className="border border-gray-300 p-2">Data de Análise</th>
                    <th className="border border-gray-300 p-2">Verba Liberada</th>
                    <th className="border border-gray-300 p-2">Data Liberação Verba</th>
                    <th className="border border-gray-300 p-2">Observações</th>
                </tr>
            </thead>
            <tbody>
                {orcamentos.map((orcamento) => (
                    <LinhaOrcamento key={orcamento.id} orcamento={orcamento} />
                ))}
            </tbody>
        </table>
    );
}
