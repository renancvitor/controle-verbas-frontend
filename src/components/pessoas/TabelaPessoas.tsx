import type { Pessoa } from "../../types/pessoas/Pessoa";
import Button from "../ui/Button";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { TooltipProps } from "@mui/material/Tooltip";

import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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

interface TabelaPessoasProps {
    pessoas: Pessoa[];
    onEditar: (pessoa: Pessoa) => void;
    onDesativar: (id: number) => void;
    onAtivar: (id: number) => void;
}

export default function TabelaPessoas({
    pessoas,
    onEditar,
    onDesativar,
    onAtivar,
}: TabelaPessoasProps) {

    return (
        <div className="flex justify-center">
            <table className="w-full border border-gray-700 rounded-lg table-auto">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="p-2 border min-w-[10rem] whitespace-nowrap">Nome</th>
                        <th className="p-2 border min-w-[8rem] whitespace-nowrap">CPF</th>
                        <th className="p-2 border min-w-[15rem] whitespace-nowrap">Email</th>
                        <th className="p-2 border min-w-[4rem] whitespace-nowrap">Cargo</th>
                        <th className="p-2 border min-w-[10rem] whitespace-nowrap">Departamento</th>
                        <th className="p-2 border whitespace-nowrap">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-800">
                            <td className="p-2 border min-w-[10rem] whitespace-nowrap">{p.nome}</td>
                            <td className="p-2 border min-w-[8rem] whitespace-nowrap">{p.cpf}</td>
                            <td className="p-2 border min-w-[15rem] whitespace-nowrap truncate">{p.email}</td>
                            <td className="p-2 border min-w-[4rem] whitespace-nowrap">{p.nomeCargo}</td>
                            <td className="p-2 border min-w-[10rem] whitespace-nowrap">{p.nomeDepartamento}</td>
                            <td className="p-2 border whitespace-nowrap">

                                <div className="flex justify-center gap-2">
                                    <CustomTooltip title="Editar" arrow>
                                        <Button
                                            variant="primary"
                                            onClick={() => onEditar(p)}
                                            iconOnly
                                        >
                                            <EditIcon />
                                        </Button>
                                    </CustomTooltip>

                                    {p.ativo ? (
                                        <CustomTooltip title="Desativar" arrow>
                                            <Button
                                                variant="danger"
                                                onClick={() => onDesativar(p.id)}
                                                iconOnly
                                            >
                                                <BlockIcon />
                                            </Button>
                                        </CustomTooltip>
                                    ) : (
                                        <CustomTooltip title="Ativar" arrow>
                                            <Button
                                                variant="success"
                                                onClick={() => onAtivar(p.id)}
                                                iconOnly
                                            >
                                                <CheckCircleIcon />
                                            </Button>
                                        </CustomTooltip>
                                    )}
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}