import { useEffect, useState } from "react";
import { listarUsuarios, deletarUsuario, ativarUsuario } from "../services/usuarioService";
import type { Usuario } from "../types/usuarios/Usuario";
import Button from "../components/ui/feature-specific/Button";
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
    const [filtroAtivo, setFiltroAtivo] = useState("ativos");
    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(10);
    const navigate = useNavigate();

    const totalUsuarios = usuarios.length;
    const totalPaginas = Math.ceil(totalUsuarios / itensPorPagina);

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = Math.min(indiceInicial + itensPorPagina, totalUsuarios);

    const usuariosExibidos = usuarios.slice(indiceInicial, indiceFinal);

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

            <div className="min-h-screen w-full bg-gray-900 text-white px-6 py-6 flex flex-col items-center">
                <div className="w-full max-w-5xl space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Usuários</h1>
                        <Button variant="pageable" onClick={() => navigate("/orcamentos")}>Voltar</Button>
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

                        <label htmlFor="itensPorPagina" className="mr-0 ml-4">Mostrar:</label>
                        <select
                            id="itensPorPagina"
                            value={itensPorPagina}
                            onChange={e => {
                                setItensPorPagina(Number(e.target.value));
                                setPaginaAtual(1);
                            }}
                            className="bg-gray-800 text-white p-2 rounded ml-0 mr-6"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    <p className="flex justify-center mt-2 text-sm text-gray-400">
                        Mostrando {indiceInicial + 1}–{indiceFinal} de {totalUsuarios} usuários
                    </p>

                    <div className="flex justify-center items-center gap-4 mt-4">
                        <Button
                            variant="pageable"
                            disabled={paginaAtual === 1}
                            onClick={() => {
                                if (paginaAtual > 1) {
                                    setPaginaAtual(paginaAtual - 1);
                                }
                            }}
                        >
                            Anterior
                        </Button>
                        <span>
                            Página {paginaAtual} de {totalPaginas}
                        </span>

                        <Button
                            variant="pageable"
                            disabled={paginaAtual === totalPaginas}
                            onClick={() => {
                                if (paginaAtual < totalPaginas) {
                                    setPaginaAtual(paginaAtual + 1);
                                }
                            }}
                        >
                            Próxima
                        </Button>
                    </div>

                    <TabelaUsuarios
                        usuarios={usuariosExibidos}
                        onEditar={(usuario) => setUsuarioEditando(usuario)}
                        abrirModal={() => setModalAberto(true)}
                        handleAtivar={handleAtivar}
                        handleDesativar={handleDesativar}
                    />

                    <div className="flex justify-center items-center gap-4 mt-4">
                        <Button
                            variant="pageable"
                            disabled={paginaAtual === 1}
                            onClick={() => {
                                if (paginaAtual > 1) {
                                    setPaginaAtual(paginaAtual - 1);
                                }
                            }}
                        >
                            Anterior
                        </Button>
                        <span>
                            Página {paginaAtual} de {totalPaginas}
                        </span>

                        <Button
                            variant="pageable"
                            disabled={paginaAtual === totalPaginas}
                            onClick={() => {
                                if (paginaAtual < totalPaginas) {
                                    setPaginaAtual(paginaAtual + 1);
                                }
                            }}
                        >
                            Próxima
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
