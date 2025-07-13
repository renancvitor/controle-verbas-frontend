import type { Orcamento } from "../../pages/Orcamentos";
import Button from "../Button";
import { liberarVerba } from "../../services/orcamentoService";
import { aprovarOrcamento, reprovarOrcamento } from "../../services/orcamentoService";

import { toast } from "react-toastify";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type LinhaProps = {
    orcamento: Orcamento;
    onStatusChange: () => void;
    mostrarColunaAnalise?: boolean;
};

export default function LinhaOrcamento({ orcamento, onStatusChange, mostrarColunaAnalise }: LinhaProps) {
    const tipoUsuarioRaw = sessionStorage.getItem("tipoUsuario");
    let ehGestor = false;

    const verbaLiberadaStr = String(orcamento.verbaLiberada);
    const verbaNaoLiberada = verbaLiberadaStr !== "true";

    if (tipoUsuarioRaw) {
        try {
            const tipoUsuario = JSON.parse(tipoUsuarioRaw);
            ehGestor = tipoUsuario?.nomeTipoUsuario === "GESTOR";
        } catch (e) {
            console.error("Erro ao interpretar tipoUsuario do sessionStorage", e);
        }
    }

    const aprovar = async () => {
        try {
            await aprovarOrcamento(orcamento.id);
            onStatusChange();
            toast.success("Orçamento aprovado com sucesso!");
        } catch (error: any) {
            const mensagem = error.response?.data?.message || "Erro ao aprovar orçamento.";
            toast.error(mensagem);
        }

    };

    const reprovar = async () => {
        try {
            await reprovarOrcamento(orcamento.id);
            onStatusChange();
            toast.success("Orçamento reprovado com sucesso!");
        } catch (error: any) {
            const mensagem = error.response?.data?.message || "Erro ao reprovar orçamento.";
            toast.error(mensagem);
        }
    };

    const liberar = async () => {
        try {
            await liberarVerba(orcamento.id);
            onStatusChange();
            toast.success("Verba liberada com sucesso.");
        } catch (error: any) {
            const mensagem = error.response?.data?.message || "Erro ao liberar verba.";
            toast.error(mensagem);
        }
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
            <td className="border border-gray-300 p-2 text-sm break-words">
                {format(new Date(orcamento.dataCriacao), "dd/MM/yyyy", { locale: ptBR })}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                {orcamento.dataAnalise
                    ? format(new Date(orcamento.dataAnalise), "dd/MM/yyyy", { locale: ptBR })
                    : "-"}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.verbaLiberada}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                {orcamento.dataLiberacaoVerba
                    ? format(new Date(orcamento.dataLiberacaoVerba), "dd/MM/yyyy", { locale: ptBR })
                    : "-"}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.observacoesGerais}</td>
            {mostrarColunaAnalise && (
                <td className="border border-gray-300 p-2 text-sm break-words">
                    {ehGestor && (
                        <>
                            <Button variant="success" fullWidth onClick={aprovar}>
                                Aprovar
                            </Button>
                            <Button variant="danger" fullWidth onClick={reprovar}>
                                Reprovar
                            </Button>
                        </>
                    )}

                    {orcamento.status === "APROVADO" && verbaNaoLiberada && (
                        <Button variant="primary" fullWidth onClick={liberar}>
                            Liberar verba
                        </Button>
                    )}
                </td>
            )}
        </tr>
    );
}
