"use client";
import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { handleLogin } = useContext(AuthContext);
    const router = useRouter();

    const handleLoginPage = async (e) => {
        e.preventDefault();
        try {
            const response = await handleLogin(email, senha);
            router.push("/");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLoginPage} className="p-8 rounded-xl shadow-md w-full max-w-md" id="modal">
                <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 p-3 border border-gray-300 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full mb-4 p-3 border border-gray-300 rounded"
                    required
                />
                <button type="submit" className="w-full text-white p-3 rounded " id="button">Entrar</button>
                <p className="mt-4">
                    Não tem uma conta?{" "}
                    <a href="/register" className="text-blue-500 underline">
                        Registre-se
                    </a>
                </p>
            </form>
        </div>
    );
}