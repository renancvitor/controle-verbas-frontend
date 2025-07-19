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
import TabelaPessoas from "../components/pessoas/TabelaPessoas";
import FormularioCadastroPessoa from "../components/pessoas/FormularioCadastroPessoa";

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

    const [modalAberto, setModalAberto] = useState(false);
    const [pessoaEditando, setPessoaEditando] = useState<Pessoa | null>(null);

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

                    <FormularioCadastroPessoa
                        form={form}
                        setForm={setForm}
                        cargos={cargos}
                        departamentos={departamentos}
                        onCadastrar={handleCadastrar}
                    />
                </div>

                <hr className="my-2 border-gray-700" />

                <div className="w-full max-w-4xl space-y-6">
                    <TabelaPessoas
                        pessoas={pessoas}
                        onEditar={(pessoa) => {
                            setPessoaEditando(pessoa);
                            setModalAberto(true);
                        }}
                        onDesativar={handleDeletar}
                        onAtivar={handleAtivar}
                    />
                </div>
            </div>
        </>
    );
}
