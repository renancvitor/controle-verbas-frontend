import type { Orcamento } from "../../pages/Orcamentos";
import Button from "../ui/Button";
import { liberarVerba } from "../../services/orcamentoService";
import { aprovarOrcamento, reprovarOrcamento } from "../../services/orcamentoService";

import { toast } from "react-toastify";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { TooltipProps } from "@mui/material/Tooltip";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} arrow />
))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "0.75rem",
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: "#000",
        "&::before": {
            backgroundColor: "#000",
        },
    },
}));

type LinhaProps = {
    orcamento: Orcamento;
    onStatusChange: () => void;
    mostrarColunaAnalise?: boolean;
};

export default function LinhaOrcamento({ orcamento, onStatusChange, mostrarColunaAnalise }: LinhaProps) {
    const tipoUsuarioRaw = sessionStorage.getItem("tipoUsuario");
    let ehGestor = false;

    const verbaLiberadaStr = String(orcamento.verbaLiberada);
    const verbaNaoLiberada = verbaLiberadaStr !== "Sim";

    if (tipoUsuarioRaw) {
        try {
            const tipoUsuario = JSON.parse(tipoUsuarioRaw);
            const tipo = tipoUsuario?.nomeTipoUsuario;
            ehGestor = tipo === "GESTOR" || tipo === "TESTER";
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
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.fornecedor}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.descricao}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                R$ {orcamento.valorTotal.toFixed(2)}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.formaPagamento}</td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.observacoesGerais}</td>
            <td className="border border-gray-300 p-2 text-sm break-words text-center">
                {format(new Date(orcamento.dataCriacao), "dd/MM/yyyy", { locale: ptBR })}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">{orcamento.solicitanteNome}</td>
            <td className="border border-gray-300 p-2 text-sm break-words text-center">
                {orcamento.dataAnalise
                    ? format(new Date(orcamento.dataAnalise), "dd/MM/yyyy", { locale: ptBR })
                    : "-"}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                {orcamento.gestorNome ?? "Não informado"}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words text-center">
                {orcamento.dataLiberacaoVerba
                    ? format(new Date(orcamento.dataLiberacaoVerba), "dd/MM/yyyy", { locale: ptBR })
                    : "-"}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words">
                {orcamento.tesoureiroNome ?? "Não informado"}
            </td>
            <td className="border border-gray-300 p-2 text-sm break-words text-center">{orcamento.status}</td>
            <td className="border border-gray-300 p-2 text-sm break-words text-center">{orcamento.verbaLiberada}</td>
            {mostrarColunaAnalise && (
                <td className="border border-gray-300 p-2 text-sm break-words">
                    {ehGestor && (
                        <div className="flex flex-col items-center gap-2">
                            <CustomTooltip title="Aprovar" arrow>
                                <Button
                                    variant="success"
                                    iconOnly
                                    onClick={aprovar}
                                >
                                    <CheckCircleOutlineIcon />
                                </Button>
                            </CustomTooltip>

                            <CustomTooltip title="Reprovar" arrow>
                                <Button
                                    variant="danger"
                                    iconOnly
                                    onClick={reprovar}
                                >
                                    <CancelIcon />
                                </Button>
                            </CustomTooltip>
                        </div>
                    )}

                    {orcamento.status === "APROVADO" && verbaNaoLiberada && (
                        <div className="mt-2 flex justify-center">
                            <CustomTooltip title="Liberar verba" arrow>
                                <Button
                                    variant="primary"
                                    iconOnly
                                    onClick={liberar}
                                >
                                    <AttachMoneyIcon />
                                </Button>
                            </CustomTooltip>
                        </div>
                    )}
                </td>
            )}
        </tr>
    );
}
