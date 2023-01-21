/*//Separando as funções com socket que serão usadas no arquivo documento.js

import { atualizaTextoEditor } from "./documento.js";

const socket = io();

//criando uma função para emitir o texto editor ser utilizada no documento.js
function emitirTextoEditor(texto) {
    socket.emit("texto_editor", texto)
}

//Recebe o texto do servidor 
socket.on("texto_editor_clientes", (texto) => {
    //Chama a função de documento.js
    atualizaTextoEditor(texto)
})

export { emitirTextoEditor };*/

import { atualizaTextoEditor } from "./documento.js";

const socket = io();

function emitirTextoEditor(texto) {
  socket.emit("texto_editor", texto);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

export { emitirTextoEditor };