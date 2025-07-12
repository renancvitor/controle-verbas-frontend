import type { Orcamento } from "../../pages/Orcamentos";

type LinhaProps = {
    orcamento: Orcamento;
    onStatusChange: () => void;
};

export default function LinhaOrcamento({ orcamento, onStatusChange }: LinhaProps) {
    const token = sessionStorage.getItem("token");

    const aprovar = async () => {
        await fetch(`http://localhost:8080/orcamentos/${orcamento.id}/aprovar`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
        });
        onStatusChange();
    };

    const reprovar = async () => {
        await fetch(`http://localhost:8080/orcamentos/${orcamento.id}/reprovar`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
        });
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
