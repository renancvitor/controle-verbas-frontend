import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    listarPessoas,
    cadastrarPessoa,
    atualizarPessoa,
    deletarPessoa,
    ativarPessoa,
} from "../services/pessoaService";
import { listarCargos } from "../services/cargoService";
import { listarDepartamentos } from "../services/departamentoService";
import type { Pessoa } from "../types/pessoas/Pessoa";
import type { DadosCadastroPessoaUsuario } from "../types/pessoas/DadosCadastroPessoaUsuario";
import type { DadosAtualizacaoPessoa } from "../types/pessoas/DadosAtualizacaoPessoa";
import type { Cargo } from "../types/cargos/Cargo";
import type { Departamento } from "../types/departamentos/Departamento";
import ModalEditarPessoa from "../components/pessoas/ModalEditarPessoa";

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

    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nomeEditado, setNomeEditado] = useState("");
    const [cargos, setCargos] = useState<Cargo[]>([]);
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

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

    const handleAtualizar = async (id: number) => {
        try {
            const pessoa = pessoas.find(p => p.id === id);
            if (!pessoa) return;

            const cargoEncontrado = cargos.find(c => c.nome === pessoa.nomeCargo);
            const departamentoEncontrado = departamentos.find(d => d.nome === pessoa.nomeDepartamento);

            if (!cargoEncontrado || !departamentoEncontrado) {
                toast.error("Cargo ou departamento não encontrado.");
                return;
            }

            const dados: DadosAtualizacaoPessoa = {
                nome: pessoa.nome,
                cpf: pessoa.cpf,
                email: pessoa.email,
                idCargo: cargoEncontrado.id,
                idDepartamento: departamentoEncontrado.id,
            };

            await atualizarPessoa(id, dados);
            toast.success("Pessoa atualizada com sucesso!");
            buscarPessoas();
        } catch {
            toast.error("Erro ao atualizar pessoa.");
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

            <div className="min-h-screen w-screen bg-gray-900 text-white px-4 py-8 flex flex-col items-center">
                <div className="w-full max-w-4xl space-y-6">
                    <h1 className="text-3xl font-bold">Pessoas</h1>

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

                    <div className="grid grid-cols-2 gap-4">
                        <input className="p-2 bg-gray-800 rounded" placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
                        <input className="p-2 bg-gray-800 rounded" placeholder="CPF" value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} />
                        <input className="p-2 bg-gray-800 rounded" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                        <input className="p-2 bg-gray-800 rounded" placeholder="Senha" type="password" value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })} />
                        <select
                            className="p-2 bg-gray-800 rounded"
                            value={form.idCargo}
                            onChange={(e) => {
                                const valor = Number(e.target.value);
                                setForm({ ...form, idCargo: isNaN(valor) ? 0 : valor });
                            }}
                        >
                            <option value={0}>Cargo</option>
                            {cargos.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.nome}
                                </option>
                            ))}
                        </select>
                        <select
                            className="p-2 bg-gray-800 rounded"
                            value={form.idDepartamento}
                            onChange={(e) => {
                                const valor = Number(e.target.value);
                                setForm({ ...form, idDepartamento: isNaN(valor) ? 0 : valor });
                            }}
                        >
                            <option value={0}>Departamento</option>
                            {departamentos.map(d => (
                                <option key={d.id} value={d.id}>
                                    {d.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button className="w-24" variant="primary" onClick={handleCadastrar}>
                            Cadastrar
                        </Button>
                        <Button className="w-24" variant="danger" onClick={() => navigate("/orcamentos")}>
                            Voltar
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <table className="w-full border border-gray-700 rounded-lg">
                            <thead>
                                <tr className="bg-gray-800">
                                    <th className="p-2 border min-w-[200px]">Nome</th>
                                    <th className="p-2 border min-w-[140px]">CPF</th>
                                    <th className="p-2 border min-w-[200px]">Email</th>
                                    <th className="p-2 border min-w-[200px]">Cargo</th>
                                    <th className="p-2 border min-w-[200px]">Departamento</th>
                                    <th className="p-2 border min-w-[200px]">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pessoas.map(p => (
                                    <tr key={p.id} className="hover:bg-gray-800">
                                        <td className="p-2 border">{p.nome}</td>
                                        <td className="p-2 border">{p.cpf}</td>
                                        <td className="p-2 border">{p.email}</td>
                                        <td className="p-2 border">{p.nomeCargo}</td>
                                        <td className="p-2 border">{p.nomeDepartamento}</td>
                                        <td className="p-2 border space-x-2 text-center">
                                            <div className="flex justify-center gap-2">
                                                <Button
                                                    className="w-24"
                                                    variant="primary"
                                                    onClick={() => {
                                                        setPessoaEditando(p);
                                                        setModalAberto(true);
                                                    }}
                                                >
                                                    Editar
                                                </Button>

                                                {p.ativo ? (
                                                    <Button className="w-24" variant="danger" onClick={() => handleDeletar(p.id)}>
                                                        Desativar
                                                    </Button>
                                                ) : (
                                                    <Button className="w-24" variant="success" onClick={() => handleAtivar(p.id)}>
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
                </div>
            </div>
        </>
    );
}
