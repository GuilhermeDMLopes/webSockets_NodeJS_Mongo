//Da branch salvandoDados_localmente. Vamos salvar os dados no MongoDB
import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
//Importando conexão com banco
import "./dbConnect.js"


const app = express();
const porta = process.env.porta || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..", "public")
app.use(express.static(diretorioPublico))

const servidorHttp = http.createServer(app);
servidorHttp.listen(porta, () => console.log(`servidor escutando na porta ${porta}`))

const io = new Server(servidorHttp);

export default io;

/*
Iremos utilizar o MongoDB Node Driver ao invés do mongoose.
npm install mongodb@4.11
*/