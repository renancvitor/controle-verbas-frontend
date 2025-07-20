import type { Departamento } from "../../types/departamentos/Departamento";
import Button from "../ui/Button";
import Input from "../ui/Input";

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
        <div className="overflow-x-auto w-full">
            <table className="w-full border border-gray-700 rounded-lg">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-700 p-2 text-left">Nome</th>
                        <th className="border border-gray-700 p-2">Ações</th>
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
                                        <Button variant="success" onClick={() => onSalvar(departamento.id)}>Salvar</Button>
                                        <Button variant="danger" onClick={onCancelar}>Cancelar</Button>
                                    </>
                                ) : (
                                    <div className="flex justify-end gap-2">
                                        <Button className="w-20" variant="primary" onClick={() => onEditar(departamento)}>Editar</Button>
                                        {departamento.ativo ? (
                                            <Button className="w-24" variant="danger" onClick={() => onDesativar(departamento.id)}>Desativar</Button>
                                        ) : (
                                            <Button className="w-24" variant="success" onClick={() => onAtivar(departamento.id)}>Ativar</Button>
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
