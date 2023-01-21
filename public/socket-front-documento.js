import { atualizaTextoEditor } from "./documento.js";

const socket = io();

//Função para enviar nome da sala/documento
function selecionarDocumento(nome) {
    //Enviando nome da Sala/Documento
    socket.emit("selecionar_documento", nome)
}

/*
//Adicionando nome da sala/documento
function emitirTextoEditor(texto, nomeDocumento) {
  //Adicionando parametro para identificar sala/documento
  socket.emit("texto_editor", texto, nomeDocumento);
}*/

//Mesma função anterior, porém recebendo objeto como parametro
function emitirTextoEditor(dados) {    
    socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

export { emitirTextoEditor, selecionarDocumento };