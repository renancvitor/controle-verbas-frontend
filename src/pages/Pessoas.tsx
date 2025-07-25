import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    listarPessoas,
    cadastrarPessoa,
    deletarPessoa,
    ativarPessoa,
} from "../services/pessoaService";
import { listarCargos } from "../services/cargoService";
import { listarDepartamentos } from "../services/departamentoService";
import type { Pessoa } from "../types/pessoas/Pessoa";
import type { DadosCadastroPessoaUsuario } from "../types/pessoas/DadosCadastroPessoaUsuario";
import type { Cargo } from "../types/cargos/Cargo";
import type { Departamento } from "../types/departamentos/Departamento";
import ModalEditarPessoa from "../components/pessoas/ModalEditarPessoa";
import TabelaPessoas from "../components/pessoas/TabelaPessoas";
import FormularioCadastroPessoa from "../components/pessoas/FormularioCadastroPessoa";

import Button from "../components/ui/Button";

import { toast } from "react-toastify";

export default function Pessoas() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [filtroAtivo, setFiltroAtivo] = useState("ativos");
    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        email: "",
        idCargo: 0,
        idDepartamento: 0,
        senha: "",
    });

    const navigate = useNavigate();

    const [modalAberto, setModalAberto] = useState(false);
    const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null);

    const [cargos, setCargos] = useState<Cargo[]>([]);
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina, setItensPorPagina] = useState(10);

    const totalPessoas = pessoas.length;
    const totalPaginas = Math.ceil(totalPessoas / itensPorPagina);

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = Math.min(indiceInicial + itensPorPagina, totalPessoas);

    const pessoasExibidas = pessoas.slice(indiceInicial, indiceFinal);

    useEffect(() => {
        buscarPessoas();
        carregarCargosEDepartamentos();
    }, [filtroAtivo]);

    const buscarPessoas = async () => {
        try {
            const ativo = filtroAtivo === "ativos" ? true : filtroAtivo === "inativos" ? false : undefined;
            const data = await listarPessoas(ativo);
            setPessoas(data);
        } catch {
            toast.error("Erro ao buscar pessoas.");
        }
    };

    const carregarCargosEDepartamentos = async () => {
        try {
            const [cargosData, departamentosData] = await Promise.all([
                listarCargos(true),
                listarDepartamentos(true),
            ]);
            setCargos(cargosData);
            setDepartamentos(departamentosData);
        } catch {
            toast.error("Erro ao carregar cargos e departamentos.");
        }
    };

    const handleCadastrar = async () => {
        const { nome, cpf, email, idCargo, idDepartamento, senha } = form;
        if (!nome || !cpf || !email || !idCargo || !idDepartamento || !senha) {
            toast.warn("Preencha todos os campos.");
            return;
        }

        try {
            const dados: DadosCadastroPessoaUsuario = {
                pessoa: { nome, cpf, email, idCargo, idDepartamento },
                usuario: { senha },
            };
            await cadastrarPessoa(dados);
            toast.success("Pessoa cadastrada com sucesso!");
            setForm({ nome: "", cpf: "", email: "", idCargo: 0, idDepartamento: 0, senha: "" });
            buscarPessoas();
        } catch {
            toast.error("Erro ao cadastrar pessoa.");
        }
    };

    const handleDeletar = async (id: number) => {
        try {
            await deletarPessoa(id);
            toast.success("Pessoa desativada com sucesso!");
            buscarPessoas();
        } catch {
            toast.error("Erro ao desativar pessoa.");
        }
    };

    const handleAtivar = async (id: number) => {
        try {
            await ativarPessoa(id);
            toast.success("Pessoa ativada com sucesso!");
            buscarPessoas();
        } catch {
            toast.error("Erro ao ativar pessoa.");
        }
    };

    return (
        <>
            {modalAberto && pessoaEditando && (
                <ModalEditarPessoa
                    pessoa={pessoaEditando}
                    cargos={cargos}
                    departamentos={departamentos}
                    onClose={() => setModalAberto(false)}
                    onAtualizado={buscarPessoas}
                />
            )}

            <div className="min-h-screen w-full bg-gray-900 text-white px-6 py-6 flex flex-col items-center">
                <div className="w-full max-w-4xl space-y-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Pessoas</h1>
                        <Button variant="pageable" onClick={() => navigate(-1)}>Voltar</Button>
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

                    <FormularioCadastroPessoa
                        form={form}
                        setForm={setForm}
                        cargos={cargos}
                        departamentos={departamentos}
                        onCadastrar={handleCadastrar}
                    />

                    <p className="flex justify-center mt-2 text-sm text-gray-400">
                        Mostrando {indiceInicial + 1}–{indiceFinal} de {totalPessoas} pessoas
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

                </div>

                <hr className="my-2 border-gray-700" />

                <div className="w-full max-w-4xl space-y-6">
                    <TabelaPessoas
                        pessoas={pessoasExibidas}
                        onEditar={(pessoa) => {
                            setPessoaEditando(pessoa);
                            setModalAberto(true);
                        }}
                        onDesativar={handleDeletar}
                        onAtivar={handleAtivar}
                    />
                </div>

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
        </>
    );
}
