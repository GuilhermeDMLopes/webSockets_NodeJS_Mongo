import { emitirTextoEditor } from "./socket-front-documento.js";
//Importando para selecionar nome da sala/documento
import { selecionarDocumento } from "./socket-front-documento.js";

//Pega o nome da sala/Documento do aprametro da URL
const parametros = new URLSearchParams(window.location.search)
const nomeDocumento = parametros.get("nome")

const tituloDocumento = document.getElementById("titulo-documento");
tituloDocumento.textContent = nomeDocumento || "Documento sem título"

selecionarDocumento(nomeDocumento)

const textoEditor = document.getElementById("editor-texto");

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value, 
    nomeDocumento
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

export { atualizaTextoEditor };
