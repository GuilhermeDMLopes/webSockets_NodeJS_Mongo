/*//Importando as funções de socket
import { emitirTextoEditor } from "./socket-front-documento.js"

const textoEditor = document.getElementById("editor-texto");

textoEditor.addEventListener("keyup", () => {
    emitirTextoEditor(textoEditor.value)
})

//Função para atualizar o texto Editor
function atualizaTextoEditor(texto) {  
    textoEditor.value = texto;    
}

export { atualizaTextoEditor };*/

import { emitirTextoEditor } from "./socket-front-documento.js";

const textoEditor = document.getElementById("editor-texto");

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor(textoEditor.value);
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

export { atualizaTextoEditor };
