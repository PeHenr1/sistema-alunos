import express, { json } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const usuarios = [];
const alunos = [
    {
        id: 1,
        nome: "Asdrubal",
        ra: "11111",
        nota1: 8.5,
        nota2: 9.5

    },
    {
        id: 2,
        nome: "Lupita",
        ra: "22222",
        nota1: 7.5,
        nota2: 7

    },
    {
        id: 3,
        nome: "Zoroastro",
        ra: "33333",
        nota1: 3.5,
        nota2: 4.5

    }, 
    {
        id: 4,
        nome: "Demóstenes",
        ra: "44444",
        nota1: 6,
        nota2: 7

    }
];

const encontrarAluno = (id) => alunos.findIndex((aluno) => aluno.id === Number(id));

const calcularMedias = () =>
    alunos.map((aluno) => ({
        nome: aluno.nome,
        media: ((aluno.nota1 + aluno.nota2) / 2).toFixed(2),
    }));

const verificarAprovacao = () =>
    alunos.map((aluno) => ({
        nome: aluno.nome,
        status: (aluno.nota1 + aluno.nota2) / 2 >= 6 ? "Aprovado" : "Reprovado",
    }));

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const senhaCriptografada = await bcrypt.hash(password, 10);
    usuarios.push({ username, password: senhaCriptografada });
    console.log(usuarios);

    res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const usuarioEncontrado = usuarios.find((u) => u.username === username);
    if (!usuarioEncontrado || !(await bcrypt.compare(password, usuarioEncontrado.password))) {
        return res.status(401).json({ mensagem: "Credenciais inválidas!" });
    }

    const token = jwt.sign({ username: usuarioEncontrado.username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
        algorithm: "HS256",
    });

    res.json({ mensagem: "Login realizado com sucesso!", token });
});

const autenticarJWT = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ mensagem: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) {
            const erroMensagem =
                err.name === "TokenExpiredError"
                    ? "Token expirado."
                    : "Token inválido.";
            return res.status(403).json({ mensagem: erroMensagem });
        }

        req.usuario = usuario;
        console.log(`Token válido para: ${usuario.usuario}`);
        next();
    });
};

app.use(autenticarJWT);

app.get("/protected1", (req, res) => res.json({ mensagem: "Rota protegida 1" }));
app.get("/protected2", (req, res) => res.json({ mensagem: "Rota protegida 2" }));
app.get("/protected3", (req, res) => res.json({ mensagem: "Rota protegida 3" }));

app.get("/", (req, res) => res.json({ mensagem: "Salve" }));

app.get("/alunos", (req, res) => res.json(alunos));

app.post("/alunos", (req, res) => {
    alunos.push(req.body);
    res.status(201).json({ mensagem: "Aluno criado com sucesso!" });
});

app.get("/alunos/aprovados", (req, res) => {
    if (!alunos.length) {
        return res.status(404).json({ mensagem: "Nenhum aluno registrado!" });
    }
    res.json(verificarAprovacao());
});

app.get("/alunos/medias", (req, res) => {
    if (!alunos.length) {
        return res.status(404).json({ mensagem: "Nenhum aluno registrado!" });
    }
    res.json(calcularMedias());
});

app.get("/alunos/:id", (req, res) => {
    const index = encontrarAluno(req.params.id);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Aluno não encontrado!" });
    }
    res.json(alunos[index]);
});

app.put("/alunos/:id", (req, res) => {
    const index = encontrarAluno(req.params.id);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Aluno não encontrado!" });
    }

    Object.assign(alunos[index], req.body);
    res.json(alunos[index]);
});

app.delete("/alunos/:id", (req, res) => {
    const index = encontrarAluno(req.params.id);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Aluno não encontrado!" });
    }

    alunos.splice(index, 1);
    res.json({ mensagem: "Aluno removido com sucesso!" });
});

export default app;
