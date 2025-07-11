import { useState } from "react";

export default function Login() {
    // Declaração do estado para email e senha
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Agora email e senha estão no escopo e podem ser usados
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
            const token = data.token; // ajuste conforme o nome do campo retornado

            localStorage.setItem("token", token);
            alert("Login realizado com sucesso!");
            // Redirecionar ou mudar estado de autenticação aqui
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login. Verifique o console.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Entrar no sistema</h2>

                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className="block mb-2 text-sm font-medium">Senha</label>
                <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded mb-6"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
