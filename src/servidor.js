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

/*
//Função migrada para outro arquivo
//Essa função pode trazer alguns parametros do evento, um deles é o proprio socket
io.on("connection", (socket) => {
  //O socket vai ser disponibilizado por cada conexão feita com o cliente pelo servidor
  console.log("Um cliente se conectou! ID: ", socket.id)
})
*/

export default io;

/*
Um socket é criado quando um cliente se conecta
Se eu duplicar a página, será mostrado que mais um cliente se conectou
com mais um id gerado
ESte ID é referente a cada conexão que o websocket criou
Separando as duas telas conectadas, quero que ao escrever em uma tela, a mensagem apareça na outra

Utilizando as boas práticas, criaremos um novo arquivo para separar essa responsabilidade
Foi criado o arquivo socket-back.js e em seguida, devemos mudar no package.json 
De:  "dev": "nodemon src/servidor.js"
para:  "dev": "nodemon src/socket-back.js"

Para fazer a comunicação em tempo real, mostrando a mensagem na outra tela, precisaremos
interagir com os elementos html, mais especificamente com o campo de texto.
Precisaremos alterar o arquivo documento.js que faz essa comunicação com o front-end
Na linha 21, em text area, pegaremos o id para capturar esse elemento em JS.

Se um cliente esta emitindo um evento, devemos configurar o servidor para escutar este evento

A partir de agora já é possível escutar um evento vindo do cliente para o servidor. Agora é necessário
replicar esse evento para os demais clientes conectados.

Depois de alterados os arquivos socket-back.js e documento.js.
Agora sera necessário atualizar as informações no frontEnd para aparecer nas duas paginas.
*/