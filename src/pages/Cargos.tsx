import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { listarCargos, cadastrarCargo } from "../services/cargoService";
import type { Cargo } from "../types/Cargo";
import Button from "../components/Button";

export default function Cargos() {
    const [cargos, setCargos] = useState<Cargo[]>([]);
    const [novoCargo, setNovoCargo] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        buscarCargos();
    }, []);

    const buscarCargos = async () => {
        try {
            const data = await listarCargos();
            setCargos(data);
        } catch {
            toast.error("Erro ao buscar cargos");
        }
    };

    const handleCadastrar = async () => {
        if (!novoCargo.trim()) {
            toast.warn("Digite o nome do cargo.");
            return;
        }

        try {
            await cadastrarCargo({ nome: novoCargo });
            setNovoCargo("");
            buscarCargos();
            toast.success("Cargo cadastrado com sucesso!");
        } catch {
            toast.error("Erro ao cadastrar cargo.");
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Cargos</h1>
                    <Button variant="danger" onClick={() => navigate(-1)}>Voltar</Button>
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={novoCargo}
                        onChange={(e) => setNovoCargo(e.target.value)}
                        placeholder="Nome do cargo"
                        className="flex-1 p-2 rounded bg-gray-800 text-white"
                    />
                    <Button variant="primary" onClick={handleCadastrar}>Cadastrar</Button>
                </div>

                <table className="w-full border border-gray-700 rounded-lg">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="border border-gray-700 p-2 text-left">Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargos.map((cargo) => (
                            <tr key={cargo.nome} className="hover:bg-gray-800">
                                <td className="border border-gray-700 p-2">{cargo.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
