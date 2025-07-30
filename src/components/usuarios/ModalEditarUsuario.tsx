import { useState } from "react";
import { atualizarTipoUsuario } from "../../services/usuarioService";
import { toast } from "react-toastify";
import Button from "../ui/feature-specific/Button";

interface Props {
    usuario: any;
    tipos: { id: number; nome: string }[];
    onClose: () => void;
    onAtualizado: () => void;
}

export default function ModalEditarUsuario({ usuario, tipos, onClose, onAtualizado }: Props) {
    const [tipoSelecionado, setTipoSelecionado] = useState(usuario.idTipoUsuario || 0);

    const handleConfirmar = async () => {
        try {
            await atualizarTipoUsuario(usuario.id, { idTipoUsuario: tipoSelecionado });
            toast.success("Tipo de usuário atualizado com sucesso!");
            onAtualizado();
            onClose();
        } catch {
            toast.error("Erro ao atualizar tipo do usuário.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded shadow-lg w-96 text-white space-y-4">
                <h2 className="text-xl font-semibold">Editar Tipo de Usuário</h2>

                <select
                    className="w-full bg-gray-800 p-2 rounded"
                    value={tipoSelecionado}
                    onChange={(e) => setTipoSelecionado(Number(e.target.value))}
                >
                    <option value={0}>Selecione</option>
                    {tipos.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>
                            {tipo.nome}
                        </option>
                    ))}
                </select>

                <div className="flex justify-left gap-2 mt-4">
                    <Button variant="primary" onClick={handleConfirmar}>Confirmar</Button>
                    <Button variant="danger" onClick={onClose}>Cancelar</Button>
                </div>
            </div>
        </div>
    );
}
