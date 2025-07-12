import type { Orcamento } from "../../pages/Orcamentos";

type LinhaProps = {
    orcamento: Orcamento;
};

export default function LinhaOrcamento({ orcamento }: LinhaProps) {
    return (
        <tr className="border-b border-gray-700 hover:bg-gray-700">
            <td className="border border-gray-300 p-2">{orcamento.descricao}</td>
            <td className="border border-gray-300 p-2">{orcamento.fornecedor}</td>
            <td className="border border-gray-300 p-2">{orcamento.formaPagamento}</td>
            <td className="border border-gray-300 p-2">
                R$ {orcamento.valorTotal.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2">{orcamento.status}</td>
            <td className="border border-gray-300 p-2">{orcamento.solicitanteNome}</td>
            <td className="border border-gray-300 p-2">
                {orcamento.gestorNome ?? "Não informado"}
            </td>
            <td className="border border-gray-300 p-2">
                {orcamento.tesoureiroNome ?? "Não informado"}
            </td>
            <td className="border border-gray-300 p-2">{orcamento.dataCriacao}</td>
            <td className="border border-gray-300 p-2">
                {orcamento.dataAnalise ?? "-"}
            </td>
            <td className="border border-gray-300 p-2">{orcamento.verbaLiberada}</td>
            <td className="border border-gray-300 p-2">
                {orcamento.dataLiberacaoVerba ?? "-"}
            </td>
            <td className="border border-gray-300 p-2">{orcamento.observacoesGerais}</td>
        </tr>
    );
}
