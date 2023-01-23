import { emitirExcluirDocumento, emitirTextoEditor } from "./socket-front-documento.js";
//Importando para selecionar nome da sala/documento
import { selecionarDocumento } from "./socket-front-documento.js";

//Pega o nome da sala/Documento do aprametro da URL
const parametros = new URLSearchParams(window.location.search)
const nomeDocumento = parametros.get("nome")

const tituloDocumento = document.getElementById("titulo-documento");
tituloDocumento.textContent = nomeDocumento || "Documento sem título"

//Pegando o id do botão excluir documento
//Assim que a pessoa clicar neste botão, deve ser enviado um emit para o servidor
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

//Evento para quando o cliente clicar no botão excluir
botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento)
})

//Função para alertar exclusao de documento e redirecionar a pagina
function alertarERedirecionar(nome) {
  //Validando para redirecionar apenas se os clientes estiverem na mesma sala/documento
  if(nome === nomeDocumento) {
    alert(`O documento ${nome} foi excluído`)
    //redirecionando para o index.html que é representado por "/"
    window.location.href = "/"
  }
}

export { atualizaTextoEditor, alertarERedirecionar };
