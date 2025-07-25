import type { Pessoa } from "../../types/pessoas/Pessoa";
import Button from "../ui/Button";

import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";

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
                                    <Tooltip title="Editar" arrow>
                                        <Button
                                            variant="primary"
                                            onClick={() => onEditar(p)}
                                            iconOnly
                                        >
                                            <EditIcon />
                                        </Button>
                                    </Tooltip>

                                    {p.ativo ? (
                                        <Tooltip title="Desativar" arrow>
                                            <Button
                                                variant="danger"
                                                onClick={() => onDesativar(p.id)}
                                                iconOnly
                                            >
                                                <BlockIcon />
                                            </Button>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Ativar" arrow>
                                            <Button
                                                variant="success"
                                                onClick={() => onAtivar(p.id)}
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