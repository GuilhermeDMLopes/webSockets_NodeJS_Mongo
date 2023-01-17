//Importando express
import express from "express";
//Importando URL
import url from "url";
//Importando caminhos do SO
import path from "path";
//importando modulo http do node
//Utilizaremos esse modulo para fazer um servidor http
import http from "http";
//Importando biblioteca para trabalharmos com webSockets
import { Server } from "socket.io";


//Criando uma aplicação com express e definindo uma porta
const app = express();
const porta = process.env.porta || 3000;

//Criando variavel para pegar o caminho dos arquivos
//Pega todo o caminho do SO até servidor.js 
const caminhoAtual = url.fileURLToPath(import.meta.url);
//Indo até o caminho dos arquivos html
//Do diretorio atual de servidor, retornar 2x e entrar no diretorio public
const diretorioPublico = path.join(caminhoAtual, "../..", "public")
//Utiliza os arquivos do diretorio publico de forma estática
app.use(express.static(diretorioPublico))
//A partir de agora, os arquivos estão sendo mostrados no navegador

//Aplicação express escutando na porta definida
//app.listen(porta, () => console.log(`servidor escutando na porta ${porta}`))
//Depois que o http foi importado, mudamos para:

//Criando servidor http passando o nosso app como parametro
const servidorHttp = http.createServer(app);
servidorHttp.listen(porta, () => console.log(`servidor escutando na porta ${porta}`))

//Criando variavel para conseguirmos implementar metodos do socket
const io = new Server(servidorHttp);

//Escutar um evento
//Quando um cliente emitir um evento connection o servidor vai escutar esse evento e executar o que esta dentro da função callback
io.on("connection", () => {
  //Para visualizarmos, precisamos fazer um cliente se conectar. La no frontend
  //Ir no navegador, clicar em JS
  console.log("Um cliente se conectou")
})

/*
Mais funcionalidades do webSocket:

- Long-polling do HTTP usado como reserva: caso o navegador não tenha suporte ao protocolo WebSockets, o Socket.IO trocará automaticamente 
para o modo long-polling do HTTP. Esse modo não é tão eficiente quanto o WebSockets, mas funciona de forma semelhante, e mantém uma conexão 
ativa entre o cliente e o servidor por um determinado período de tempo, sendo melhor que o modelo requisição-resposta tradicional do HTTP.

- Reconexão automática: caso algum cliente não consiga se conectar ao servidor, o Socket.IO tentará periodicamente conectá-lo novamente, 
o que vai aumentar o tamanho desse período a cada tentativa.

- Buffer de pacotes: quando um cliente é desconectado, seus pacotes de dados são guardados e, quando o cliente for reconectado, eles serão 
enviados automaticamente.

https://cursos.alura.com.br/course/websockets-comunicacoes-tempo-real-socket-io-mongodb/task/117096
*/