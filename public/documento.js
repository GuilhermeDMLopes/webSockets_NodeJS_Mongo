import { emitirTextoEditor } from "./socket-front-documento.js";
//Importando para selecionar nome da sala/documento
import { selecionarDocumento } from "./socket-front-documento.js";

//Pega o nome da sala/Documento do aprametro da URL
const parametros = new URLSearchParams(window.location.search)
const nomeDocumento = parametros.get("nome")

//Mudando o nome do Documento na pagina de "Documento Sem titulo" para o nome real do documento
//Pego o id de onde esta essa informação no html (linha 17)
const tituloDocumento = document.getElementById("titulo-documento");
//Faço a renomeação. Caso não tenha nenhum nome, manter o nome padrão
tituloDocumento.textContent = nomeDocumento || "Documento sem título"

//enviando nome do documento para o socket
selecionarDocumento(nomeDocumento)

const textoEditor = document.getElementById("editor-texto");

textoEditor.addEventListener("keyup", () => {
  //Passando o nome da sala/documento como parametro
  //emitirTextoEditor(textoEditor.value, nomeDocumento);
  //Por boas práticas, passamos um objeto por parametro ao inves de variaveis
  emitirTextoEditor({
    texto: textoEditor.value, 
    nomeDocumento
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

export { atualizaTextoEditor };
