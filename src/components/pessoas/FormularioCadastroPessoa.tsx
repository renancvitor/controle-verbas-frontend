import React from "react";
import type { Cargo } from "../../types/cargos/Cargo";
import type { Departamento } from "../../types/departamentos/Departamento";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface FormularioCadastroPessoaProps {
    form: {
        nome: string;
        cpf: string;
        email: string;
        senha: string;
        idCargo: number;
        idDepartamento: number;
    };
    setForm: React.Dispatch<React.SetStateAction<FormularioCadastroPessoaProps["form"]>>;
    cargos: Cargo[];
    departamentos: Departamento[];
    onCadastrar: () => void;
}

function formatarCPF(cpf: string) {
    return cpf
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
}

export default function FormularioCadastroPessoa({
    form,
    setForm,
    cargos,
    departamentos,
    onCadastrar,
}: FormularioCadastroPessoaProps) {

    return (
        <div className="w-full max-w-4xl space-y-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-0">
                <Input
                    className="p-2 bg-gray-800 rounded"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
                <Input
                    className="p-2 bg-gray-800 rounded"
                    placeholder="CPF"
                    value={form.cpf}
                    onChange={(e) =>
                        setForm({ ...form, cpf: formatarCPF(e.target.value) })}
                />
                <Input
                    type="email"
                    className="p-2 bg-gray-800 rounded"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Input
                    className="p-2 bg-gray-800 rounded"
                    placeholder="Senha"
                    type="password"
                    value={form.senha}
                    onChange={(e) => setForm({ ...form, senha: e.target.value })}
                />
                <select
                    className="p-2 bg-gray-800 rounded mt-2"
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
                    className="p-2 bg-gray-800 rounded mt-2"
                    value={form.idDepartamento}
                    onChange={(e) => {
                        const valor = Number(e.target.value);
                        setForm({ ...form, idDepartamento: isNaN(valor) ? 0 : valor });
                    }}
                >
                    <option value={0}>Departamento</option>
                    {departamentos.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.nome}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex gap-2 mt-4 mb-6">
                <Button className="w-24" variant="pageable" onClick={onCadastrar}>
                    Cadastrar
                </Button>
            </div>
        </div>
    );
}
