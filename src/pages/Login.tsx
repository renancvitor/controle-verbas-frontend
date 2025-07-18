import { useNavigate } from "react-router-dom";

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
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                throw new Error("Falha no login. Verifique as credenciais.");
            }

            const data = await response.json();
            const token = data.token;
            const tipoUsuario = data.usuario;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("tipoUsuario", JSON.stringify(tipoUsuario));
            sessionStorage.setItem("usuarioId", data.usuario.id);

            navigate("/orcamentos");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login. Verifique o console.");
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Entrar no sistema</h2>

                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label="Senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <Button type="submit" fullWidth>
                    Entrar
                </Button>
            </form>
        </div>
    );
}
