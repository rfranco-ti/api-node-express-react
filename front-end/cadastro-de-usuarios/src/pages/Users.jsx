import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./style.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await api.get("/usuarios");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }
    getUsers();
  }, []);

  const handleNextUser = () => {
    const nextIndex = (currentUserIndex + 1) % users.length;
    setCurrentUserIndex(nextIndex);
  };

  const handlePreviousUser = () => {
    const previousIndex = (currentUserIndex - 1 + users.length) % users.length;
    setCurrentUserIndex(previousIndex);
  };

  const handleDeleteUser = async () => {
    if (!currentUser) {
      console.error("Nenhum usuário selecionado para deletar.");
      return;
    }
    try {
      await api.delete(`/usuarios/${currentUser.id}`);
      const updatedUsers = users.filter((user) => user.id !== currentUser.id); // remove da lista
      setUsers(updatedUsers);
      alert("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Erro ao deletar usuário. Tente novamente.");
    }
  };
  const currentUser = users[currentUserIndex];

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
        </div>
        <div className="space-y-4">
          {currentUser ? (
            <div className="rounded-md border border-gray-300 p-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  <span className="font-bold">ID:</span> {currentUser.id}
                </p>
                <p className="text-sm font-medium">
                  <span className="font-bold">Nome:</span> {currentUser.name}
                </p>
                <p className="text-sm font-medium">
                  <span className="font-bold">Idade:</span> {currentUser.age}
                </p>
                <p className="text-sm font-medium">
                  <span className="font-bold">Email:</span> {currentUser.email}
                </p>
              </div>
            </div>
          ) : (
            <p>Carregando usuarios...</p>
          )}
          <div className="flex flex-col mt-4 space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={handlePreviousUser}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
              >
                Anterior
              </button>
              <button
                onClick={handleNextUser}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
              >
                Próximo
              </button>
            </div>
            <button
              onClick={handleDeleteUser}
              className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Deletar usuário
            </button>
            <Link
              to="/"
              className="text-center w-full rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
