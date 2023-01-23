//Da branch salvandoDados_MongoDB. Vamos fazer inserção e deleção de novas salas/documentos
import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
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
Primeiramente, as salas/documentos mostradas no frontEnd estão aparecendo de forma estática.
Precisamos deixar que as salas/documentos estejam vinculadas com o Banco de dados.
Iremos alterar o arquivo index.html. 
Será criado um arquivo index.js para passar essas informações para o html
Assim que um cliente entrar na página inicial será necessário emitir um evento para o backend

Criaremos um novo arquivo socket-front-index.js

Depois de todas as alterações, iremos inserir um documento no BD e vermos que será atualizado no front

Agora, iremos adicionar documentos pelo próprio código.
Primeiramente precisaremos capturar o texto vindo do front para adicionar.
Verificaremos o ID do elemento em index.html

Em seguida, vamos validar se o documento já existe no BD para ele não duplicar

Feito isso, iremos excluir um documento
iremos em documento.html onde está o botão de exclusão

Agora que fizemos a exclusão, precisaremos melhorar nossa interface
Ao excluir um documento, precisaremos ser notificados e redirecionados para a pagina inicial

Encontramos um problema:
Quando os clientes estão em salas/documentos diferentes e excluimos um deles
Ambos voltam para a pagina inicial mesmo estando em salas/documentos diferentes.

Iremos validar este problema em documento.js.

Outro problema encontrado:
Se ambos os clientes estiverem na pagina inicial e um deles for e exluir uma sala/documento
o cliente que estava na pagina inicial não receberá essa atualização, ele precisará recarregar a pagina.
Faremos essa validação em socket-front-index.js
*/