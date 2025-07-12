import type { Orcamento } from "../../pages/Orcamentos";
import { aprovarOrcamento, reprovarOrcamento } from "../../services/orcamentoService";

type LinhaProps = {
    orcamento: Orcamento;
    onStatusChange: () => void;
};

export default function LinhaOrcamento({ orcamento, onStatusChange }: LinhaProps) {
    const aprovar = async () => {
        await aprovarOrcamento(orcamento.id);
        onStatusChange();
    };

    const reprovar = async () => {
        await reprovarOrcamento(orcamento.id);
        onStatusChange();
    };

    return (
        <tr className="border-b border-gray-300 hover:bg-gray-800 hover:text-white">
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.descricao}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.fornecedor}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.formaPagamento}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                R$ {orcamento.valorTotal.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.status}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.solicitanteNome}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                {orcamento.gestorNome ?? "Não informado"}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                {orcamento.tesoureiroNome ?? "Não informado"}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.dataCriacao}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                {orcamento.dataAnalise ?? "-"}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.verbaLiberada}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                {orcamento.dataLiberacaoVerba ?? "-"}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.observacoesGerais}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded w-full"
                    onClick={aprovar}
                >
                    Aprovar
                </button>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded mt-1 w-full"
                    onClick={reprovar}
                >
                    Reprovar
                </button>
            </td>
        </tr>
    );
}
