import Button from "../ui/Button";

import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";


interface Usuario {
    id: number;
    email: string;
    tipoUsuario: string;
    ativo: boolean;
    nomePessoa: string;
    idTipoUsuario: number;
}

interface Props {
    usuarios: Usuario[];
    onEditar: (usuario: Usuario) => void;
    abrirModal: () => void;
    handleAtivar: (id: number) => void;
    handleDesativar: (id: number) => void;
}

export default function TabelaUsuarios({
    usuarios,
    onEditar,
    abrirModal,
    handleAtivar,
    handleDesativar
}: Props) {

    return (
        <div className="flex justify-center overflow-x-auto w-full">
            <table className="table-fixed w-auto border border-gray-700 rounded-lg">
                <thead>
                    <tr className="bg-gray-800">

                        <th className="p-2 border w-[300px]">Email</th>
                        <th className="p-2 border w-[200px]">Tipo</th>
                        <th className="p-2 border w-[180px]">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-800">

                            <td className="p-2 border">{u.email}</td>
                            <td className="p-2 border text-center">{u.tipoUsuario}</td>
                            <td className="p-2 border">

                                <div className="flex gap-2 justify-center">
                                    <Tooltip title="Editar" arrow>
                                        <Button
                                            variant="primary"
                                            onClick={() => { onEditar(u); abrirModal(); }}
                                            iconOnly
                                        >
                                            <EditIcon />
                                        </Button>
                                    </Tooltip>

                                    {u.ativo ? (
                                        <Tooltip title="Desativar" arrow>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDesativar(u.id)}
                                                iconOnly
                                            >
                                                <BlockIcon />
                                            </Button>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Ativar" arrow>
                                            <Button
                                                variant="success"
                                                onClick={() => handleAtivar(u.id)}
                                                iconOnly
                                            >
                                                <CheckCircleIcon />
                                            </Button>
                                        </Tooltip>
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
