import { emitirExcluirDocumento, emitirTextoEditor } from "./socket-front-documento.js";
import { selecionarDocumento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search)
const nomeDocumento = parametros.get("nome")

const tituloDocumento = document.getElementById("titulo-documento");
tituloDocumento.textContent = nomeDocumento || "Documento sem título"

const botaoExcluir = document.getElementById("excluir-documento")

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

botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento)
})

function alertarERedirecionar(nome) {
  if(nome === nomeDocumento) {
    alert(`O documento ${nome} foi excluído`)
    window.location.href = "/"
  }
}

export { atualizaTextoEditor, alertarERedirecionar };
