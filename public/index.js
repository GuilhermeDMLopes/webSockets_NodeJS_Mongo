//Arquivo para vincular o banco com o frontend
//Importando arquivo para emitir eventos para o servidor, provenientes de index.js
//Assim que um cliente entrar em index.html, o código socket-front-index.js será executado
//import "./socket-front-index.js"
import { emitirAdicionarDocumento } from "./socket-front-index.js"

//Copiando a lista de documentos de index.html pelo ID
const listaDocumentos = document.getElementById("lista-documentos")

//Variavel para pegar o formulario onde se adiciona sala/documento
const form = document.getElementById("form-adiciona-documento")

//Variavel para pegar o texto do formulario para adicionar sala/documento
const inputDocumento = document.getElementById("input-documento")

//Capturar elemento do campo que é digitado no campo de texto
//Criar evento para submeter o formulário, ou seja, caso eu de um enter no campo de adicionar documento, o submit sera acionado
form.addEventListener("submit", (evento) => {
    //Por default, o formulario atualiza a página quando executado
    //Para evitar essa ação, fazemos:
    evento.preventDefault()
    //Pegando o valor do campo de texto do form e mostrando no console do browser
    //console.log(inputDocumento.value);
    //Função para enviar o texto para o servidor/backend em socket-front-index
    emitirAdicionarDocumento(inputDocumento.value)
    //Limpar campo depois de adicionar documento
    inputDocumento.value = "";
})

//Função para inserir de forma dinamica um link para um documento
function inserirLinkDocumento(nomeDocumento) {
    //Inserindo no front de forma dinâmica através do código html
    //Iremos adicionar um id para cada documento
    listaDocumentos.innerHTML += `
        <a 
            href="documento.html?nome=${nomeDocumento}" 
            class="list-group-item list-group-item-action"
            id="documento-${nomeDocumento}"
        >
            ${nomeDocumento}
        </a>
    `;  
}
//Neste momento estamos inserindo os documentos de forma manual, mas ainda queremos linkar com o BD
//inserirLinkDocumento("JavaScript")

//Função para remover o link do documento
function removerLinkDocumento(nomeDocumento) {
    //Pega o id do link de documento
    const documento = document.getElementById(`documento-${nomeDocumento}`)
    //Remove elemento que foi exluido
    listaDocumentos.removeChild(documento)
}

export { inserirLinkDocumento, removerLinkDocumento }