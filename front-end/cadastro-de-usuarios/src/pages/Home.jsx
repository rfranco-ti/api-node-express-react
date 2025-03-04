import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./style.css";

function Home() {
  const minimalValueAgeInput = 0;
  const navigate = useNavigate();
  const handleViewUsers = () => {
    navigate("/users");
  };
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    age: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/usuarios", formData);
      setFormData({ email: "", name: "", age: "" });
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Email já cadastrado"
      ) {
        alert("Erro: Este email já está cadastrado.");
      } else {
        alert("Erro ao cadastrar usuário. Tente novamente.");
      }
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Cadastro de Usuários</h1>
        </div>
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Usuário
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Digite seu nome de usuário"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Digite seu email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium">
                Idade
              </label>
              <input
                id="age"
                type="number"
                min={minimalValueAgeInput}
                value={formData.age}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    age: parseInt(e.target.value, 10),
                  })
                }
                placeholder="Digite sua idade"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cadastrar Usuário
            </button>
          </form>
          <div className="mt-4">
            <button
              onClick={handleViewUsers}
              className="w-full rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Ver Todos os Usuários
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
