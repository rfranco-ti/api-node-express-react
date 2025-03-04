import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.post("/usuarios", async (req, res) => {
  try {
    const { email, name, age } = req.body;
    if (!email || !name || !age) {
      return res.status(400).json({
        error: "Todos os campos são obrigatórios: email, name, age",
      });
    }
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        age,
      },
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email já cadastrado" });
    }
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const { name, email, age: rawAge } = req.query;

    // Constrói o objeto `where` dinamicamente, incluindo apenas os campos válidos
    const where = {};

    if (name) {
      where.name = name; // Inclui `name` apenas se for fornecido
    }

    if (email) {
      where.email = email; // Inclui `email` apenas se for fornecido
    }

    if (rawAge !== undefined) {
      const age = parseInt(rawAge, 10); // Converte `age` para número
      if (!isNaN(age)) {
        where.age = age; // Inclui `age` apenas se for um número válido
      }
    }

    // Executa a consulta com ou sem filtros
    const users = await prisma.user.findMany({
      where: Object.keys(where).length > 0 ? where : undefined, // Aplica filtros apenas se `where` não estiver vazio
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//":id" -> a rota esta recebendo uma variavel chamada id
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { email, name, age } = req.body;
    const id = req.params.id;
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
        age,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "ID não encontrado" });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "User deletado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "ID não encontrado" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

export default app;
