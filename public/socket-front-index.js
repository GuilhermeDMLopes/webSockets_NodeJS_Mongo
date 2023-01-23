//Arquivo para emitir um evento ao servidor proveniente do arquivo index.js

import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";

//Utilizando socket na parte do front
const socket = io();

//Envia um evento e escuta a resposta do mesmo. Recebe a resposta de devolverDocumentos()
//Em seguida, altera a interface
socket.emit("obter_documentos", (documentos) => {
    //Pega cada documento vindo de devolverDocumentos() 
    documentos.forEach((documento) => {
        //Envia para o Front o nome de cada documento do BD
        inserirLinkDocumento(documento.nome)
    }
)});

//Função que vai enviar para o servidor o campo de texto para adicionar documento
function emitirAdicionarDocumento(nome) {
    //EMitindo um evendo com o nome do documento
    socket.emit("adicionar_documento", nome)
}

//Escutando evento para atualizar a pagina inicial com novo documento
socket.on("adicionar_documento_interface", (nome) => {
    inserirLinkDocumento(nome);
})

//Se o documento exister, ele receberá o evento e mostrará ao cliente
socket.on("documento_existente", (nome) => {
    //Mostra no console do browser
    //console.log(`O documento ${nome} já existe!`)
    //envia uma mensagem no front
    alert(`O documento ${nome} já existe!`)
})

//Evento para atualizar pagina quando um cliente estiver na pagina inicial e houver um documento exlcuido
socket.on("excluir_documento_sucesso", (nome) => {
    removerLinkDocumento(nome)
})

export { emitirAdicionarDocumento }