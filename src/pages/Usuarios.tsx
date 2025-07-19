import { useEffect, useState } from "react";
import { listarUsuarios, deletarUsuario, ativarUsuario } from "../services/usuarioService";
import type { Usuario } from "../types/usuarios/Usuario";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalEditarUsuario from "../components/usuarios/ModalEditarUsuario";
import TabelaUsuarios from "../components/usuarios/TabelaUsuarios";

const tiposMock = [
    { id: 1, nome: "ADMIN" },
    { id: 2, nome: "GESTOR" },
    { id: 3, nome: "TESOUREIRO" },
    { id: 4, nome: "COMUM" },
];

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [filtroAtivo, setFiltroAtivo] = useState("todos");
    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        buscarUsuarios();
    }, [filtroAtivo]);

    const buscarUsuarios = async () => {
        try {
            const ativo = filtroAtivo === "ativos" ? true : filtroAtivo === "inativos" ? false : undefined;
            const lista = await listarUsuarios(ativo);
            setUsuarios(lista);
        } catch {
            toast.error("Erro ao buscar usuários.");
        }
    };

    const handleDesativar = async (id: number) => {
        try {
            await deletarUsuario(id);
            toast.success("Usuário desativado!");
            buscarUsuarios();
        } catch {
            toast.error("Erro ao desativar.");
        }
    };

    const handleAtivar = async (id: number) => {
        try {
            await ativarUsuario(id);
            toast.success("Usuário ativado!");
            buscarUsuarios();
        } catch {
            toast.error("Erro ao ativar.");
        }
    };

    return (
        <>
            {modalAberto && usuarioEditando && (
                <ModalEditarUsuario
                    usuario={usuarioEditando}
                    tipos={tiposMock}
                    onClose={() => setModalAberto(false)}
                    onAtualizado={buscarUsuarios}
                />
            )}

            <div className="min-h-screen w-screen bg-gray-900 text-white px-4 py-8 flex flex-col items-center">
                <div className="w-full max-w-5xl space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Usuários</h1>
                        <Button variant="danger" onClick={() => navigate("/orcamentos")}>Voltar</Button>
                    </div>

                    <div>
                        <label className="mr-2">Filtro:</label>
                        <select
                            className="bg-gray-800 text-white p-2 rounded"
                            value={filtroAtivo}
                            onChange={(e) => setFiltroAtivo(e.target.value)}
                        >
                            <option value="todos">Todos</option>
                            <option value="ativos">Ativos</option>
                            <option value="inativos">Inativos</option>
                        </select>
                    </div>

                    <TabelaUsuarios
                        usuarios={usuarios}
                        onEditar={(usuario) => setUsuarioEditando(usuario)}
                        abrirModal={() => setModalAberto(true)}
                        handleAtivar={handleAtivar}
                        handleDesativar={handleDesativar}
                    />
                </div>
            </div>
        </>
    );
}
