import type { Departamento } from "../../types/departamentos/Departamento";
import Button from "../ui/Button";
import Input from "../ui/Input";

import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import type { TooltipProps } from "@mui/material/Tooltip";

import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

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

type Props = {
    departamentos: Departamento[];
    editandoId: number | null;
    nomeEditado: string;
    onEditar: (dep: Departamento) => void;
    onChangeNomeEditado: (nome: string) => void;
    onSalvar: (id: number) => void;
    onCancelar: () => void;
    onAtivar: (id: number) => void;
    onDesativar: (id: number) => void;
};

export default function TabelaDepartamentos({
    departamentos,
    editandoId,
    nomeEditado,
    onEditar,
    onChangeNomeEditado,
    onSalvar,
    onCancelar,
    onAtivar,
    onDesativar,
}: Props) {
    return (
        <div className="flex justify-center overflow-x-auto w-full">
            <table className="table-fixed w-auto border border-gray-700 rounded-lg">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-700 p-2">Nome</th>
                        <th className="border border-gray-700 p-2 w-[180px]">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {departamentos.map((departamento) => (
                        <tr key={departamento.id} className="hover:bg-gray-800">
                            <td className="border border-gray-700 p-2">
                                {editandoId === departamento.id ? (
                                    <Input
                                        type="text"
                                        value={nomeEditado}
                                        onChange={(e) => onChangeNomeEditado(e.target.value)}
                                        className="w-full p-1 rounded bg-gray-800 text-white"
                                    />
                                ) : (
                                    departamento.nome
                                )}
                            </td>
                            <td className="border border-gray-700 p-2 text-center">
                                {editandoId === departamento.id ? (
                                    <>
                                        <div className="flex gap-2 justify-center">
                                            <CustomTooltip title="Salvar" arrow>
                                                <Button variant="success" onClick={() => onSalvar(departamento.id)} iconOnly>
                                                    <SaveIcon />
                                                </Button>
                                            </CustomTooltip>
                                            <CustomTooltip title="Cancelar" arrow>
                                                <Button variant="danger" onClick={onCancelar} iconOnly>
                                                    <CloseIcon />
                                                </Button>
                                            </CustomTooltip>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-center gap-2">
                                        <CustomTooltip title="Editar" arrow>
                                            <Button
                                                variant="primary"
                                                onClick={() => onEditar(departamento)}
                                                iconOnly
                                            >
                                                <EditIcon />
                                            </Button>
                                        </CustomTooltip>
                                        {departamento.ativo ? (
                                            <CustomTooltip title="Desativar" arrow>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => onDesativar(departamento.id)}
                                                    iconOnly
                                                >
                                                    <BlockIcon />
                                                </Button>
                                            </CustomTooltip>
                                        ) : (
                                            <CustomTooltip title="Ativar" arrow>
                                                <Button
                                                    variant="success"
                                                    onClick={() => onAtivar(departamento.id)}
                                                    iconOnly
                                                >
                                                    <CheckCircleIcon />
                                                </Button>
                                            </CustomTooltip>
                                        )}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
