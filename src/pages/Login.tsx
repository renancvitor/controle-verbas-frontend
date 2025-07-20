import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login", {
                email,
                senha,
            });

            const data = response.data;
            const token = data.token;
            const tipoUsuario = data.usuario;

            sessionStorage.setItem("token", token);
            sessionStorage.setItem("tipoUsuario", JSON.stringify(tipoUsuario));
            sessionStorage.setItem("usuarioId", data.usuario.id);

            navigate("/orcamentos");
            toast.success(`👋 Bem-vindo(a), ${data.usuario.nomePessoa}!`);

        } catch (error: any) {
            const mensagem = error.response?.data?.message || "Erro ao fazer login.";
            toast.error(mensagem);
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 text-white p-6 rounded w-full max-w-sm shadow space-y-6"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Entrar no sistema</h2>

                <Input
                    label="E-mail"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-900 text-white rounded p-2 w-full"
                />
                <Input
                    label="Senha"
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="bg-gray-900 text-white rounded p-2 w-full"
                />
                <Button type="submit" fullWidth>
                    Entrar
                </Button>
            </form>
        </div>
    );
}
