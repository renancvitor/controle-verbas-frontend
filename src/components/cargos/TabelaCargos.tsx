import Button from "../ui/Button";
import Input from "../ui/Input";
import type { Cargo } from "../../types/cargos/Cargo";

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
        <div className="overflow-x-auto w-full">
            <table className="w-full border border-gray-700 rounded-lg">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="border border-gray-700 p-2 text-left">Nome</th>
                        <th className="border border-gray-700 p-2">Ações</th>
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
                                            <Button variant="success" onClick={() => onSalvar(cargo.id)}>Salvar</Button>
                                            <Button variant="danger" onClick={onCancelar}>Cancelar</Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-center gap-2">
                                        <Button className="w-20" variant="primary" onClick={() => onEditar(cargo)}>Editar</Button>
                                        {cargo.ativo ? (
                                            <Button className="w-24" variant="danger" onClick={() => onDesativar(cargo.id)}>Desativar</Button>
                                        ) : (
                                            <Button className="w-24" variant="success" onClick={() => onAtivar(cargo.id)}>Ativar</Button>
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
