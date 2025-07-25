import Button from "../ui/Button";
import Input from "../ui/Input";
import type { Cargo } from "../../types/cargos/Cargo";

import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";

import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    cargos: Cargo[];
    editandoId: number | null;
    nomeEditado: string;
    onEditar: (cargo: Cargo) => void;
    onChangeNomeEditado: (nome: string) => void;
    onSalvar: (id: number) => void;
    onCancelar: () => void;
    onAtivar: (id: number) => void;
    onDesativar: (id: number) => void;
};

export default function TabelaCargos({
    cargos,
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
                    {cargos.map((cargo) => (
                        <tr key={cargo.id} className="hover:bg-gray-800">
                            <td className="border border-gray-700 p-2">
                                {editandoId === cargo.id ? (
                                    <Input
                                        type="text"
                                        value={nomeEditado}
                                        onChange={(e) => onChangeNomeEditado(e.target.value)}
                                        className="w-full p-1 rounded bg-gray-800 text-white"
                                    />
                                ) : (
                                    cargo.nome
                                )}
                            </td>
                            <td className="border border-gray-700 p-2 text-center">
                                {editandoId === cargo.id ? (
                                    <>
                                        <div className="flex gap-2 justify-center">
                                            <Tooltip title="Salvar" arrow>
                                                <Button variant="success" onClick={() => onSalvar(cargo.id)} iconOnly>
                                                    <SaveIcon />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Cancelar" arrow>
                                                <Button variant="danger" onClick={onCancelar} iconOnly>
                                                    <CloseIcon />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-center gap-2">
                                        <Tooltip title="Editar" arrow>
                                            <Button
                                                variant="primary"
                                                onClick={() => onEditar(cargo)}
                                                iconOnly
                                            >
                                                <EditIcon />
                                            </Button>
                                        </Tooltip>
                                        {cargo.ativo ? (
                                            <Tooltip title="Desativar" arrow>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => onDesativar(cargo.id)}
                                                    iconOnly
                                                >
                                                    <BlockIcon />
                                                </Button>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="Ativar" arrow>
                                                <Button
                                                    variant="success"
                                                    onClick={() => onAtivar(cargo.id)}
                                                    iconOnly
                                                >
                                                    <CheckCircleIcon />
                                                </Button>
                                            </Tooltip>
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
