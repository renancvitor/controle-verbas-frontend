import { useState, useEffect } from "react";
import Button from "../ui/Button";
import type { Cargo } from "../../types/cargos/Cargo";
import type { Departamento } from "../../types/departamentos/Departamento";
import type { Pessoa } from "../../types/pessoas/Pessoa";
import type { DadosAtualizacaoPessoa } from "../../types/pessoas/DadosAtualizacaoPessoa";
import { toast } from "react-toastify";
import { atualizarPessoa } from "../../services/pessoaService";

type Props = {
    pessoa: Pessoa;
    cargos: Cargo[];
    departamentos: Departamento[];
    onClose: () => void;
    onAtualizado: () => void;
};

export default function ModalEditarPessoa({
    pessoa,
    cargos,
    departamentos,
    onClose,
    onAtualizado,
}: Props) {
    const [novoIdCargo, setNovoIdCargo] = useState(0);
    const [novoIdDepartamento, setNovoIdDepartamento] = useState(0);

    useEffect(() => {
        setNovoIdCargo(0);
        setNovoIdDepartamento(0);
    }, [pessoa]);

    const handleConfirmar = async () => {
        if (novoIdCargo === 0 || novoIdDepartamento === 0) {
            toast.warn("Selecione um cargo e departamento válidos.");
            return;
        }

        const dados: DadosAtualizacaoPessoa = {
            nome: pessoa.nome,
            cpf: pessoa.cpf,
            email: pessoa.email,
            idCargo: novoIdCargo,
            idDepartamento: novoIdDepartamento,
        };

        try {
            await atualizarPessoa(pessoa.id, dados);
            toast.success("Pessoa atualizada com sucesso!");
            onAtualizado();
            onClose();
        } catch {
            toast.error("Erro ao atualizar pessoa.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg space-y-4 border border-gray-700">
                <h2 className="text-xl font-bold">Atualizar Cargo e Departamento</h2>

                <div className="space-y-2">
                    <label className="block">Cargo:</label>
                    <select
                        className="w-full p-2 bg-gray-800 rounded"
                        value={novoIdCargo}
                        onChange={(e) => setNovoIdCargo(Number(e.target.value))}
                    >
                        <option value={0}>Selecione um cargo</option>
                        {cargos.map((cargo) => (
                            <option key={cargo.id} value={cargo.id}>
                                {cargo.nome}
                            </option>
                        ))}
                    </select>

                    <label className="block">Departamento:</label>
                    <select
                        className="w-full p-2 bg-gray-800 rounded"
                        value={novoIdDepartamento}
                        onChange={(e) => setNovoIdDepartamento(Number(e.target.value))}
                    >
                        <option value={0}>Selecione um departamento</option>
                        {departamentos.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmar}>
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
}
