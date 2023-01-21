//Da branch organizando_arquivos. Vamos avançar na comunicação
import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";


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
No FrontEnd temos diversas 'salas'/Documentos: JavaScript, Node e socket.io.
Se escrevermos na sala/Documento Node, o texto será mostrado na sala/Documento 'JavaScript'.
Não queremos que isso aconteça, queremos separar cada uma das salas/Documentos.

Após definirmos os nomes de cada sala/Documento no front end, precisaremos enviar essas informações para o
servidor para que ele saiba identificar cada um.

Será realizado em socket-front-documento.js
Assim que alguem entrar na pagina, sera feito um socket.emit enviando o nome do documento

Agora escutaremos esse evento no backend.

O próximo problema é:
Tudo esta funcionando OK, porém, quando atualizamos a pagina, perdemos tudo que foi escrito.
Precisaremos gaurdar esses dados
*/