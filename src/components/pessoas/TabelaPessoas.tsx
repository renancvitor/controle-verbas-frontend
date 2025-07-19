import type { Pessoa } from "../../types/pessoas/Pessoa";
import Button from "../ui/Button";

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
                                    <Button className="w-24" variant="primary" onClick={() => onEditar(p)}>
                                        Editar
                                    </Button>
                                    {p.ativo ? (
                                        <Button className="w-24" variant="danger" onClick={() => onDesativar(p.id)}>
                                            Desativar
                                        </Button>
                                    ) : (
                                        <Button className="w-24" variant="success" onClick={() => onAtivar(p.id)}>
                                            Ativar
                                        </Button>
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