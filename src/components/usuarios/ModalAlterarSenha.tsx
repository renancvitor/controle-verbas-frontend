import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { atualizarSenhaUsuario } from "../../services/usuarioService";

interface Props {
    usuarioId: number;
    onClose: () => void;
}

export default function ModalAlterarSenha({ usuarioId, onClose }: Props) {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

    const handleSalvar = async () => {
        if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
            toast.warn("Preencha todos os campos.");
            return;
        }

        try {
            await atualizarSenhaUsuario(usuarioId, {
                senhaAtual,
                novaSenha,
                confirmarNovaSenha,
            });

            toast.success("Senha atualizada com sucesso!");
            onClose();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Erro ao atualizar senha.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white p-6 rounded w-96 shadow space-y-4">
                <h2 className="text-xl font-semibold">Alterar Senha</h2>

                <Input
                    className="w-full p-2 bg-gray-800 rounded"
                    type="password"
                    placeholder="Senha atual"
                    value={senhaAtual}
                    onChange={(e) => setSenhaAtual(e.target.value)}
                />
                <Input
                    className="w-full p-2 bg-gray-800 rounded"
                    type="password"
                    placeholder="Nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                />
                <Input
                    className="w-full p-2 bg-gray-800 rounded"
                    type="password"
                    placeholder="Confirmar nova senha"
                    value={confirmarNovaSenha}
                    onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                />

                <div className="flex justify-left gap-2">
                    <Button variant="primary" onClick={handleSalvar}>Salvar</Button>
                    <Button variant="danger" onClick={onClose}>Cancelar</Button>
                </div>
            </div>
        </div>
    );
}
