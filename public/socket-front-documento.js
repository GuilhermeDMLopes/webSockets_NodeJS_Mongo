import { alertarERedirecionar, atualizaTextoEditor } from "./documento.js";

const socket = io();

function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome, (texto) => {
        atualizaTextoEditor(texto)
    })
}

function emitirTextoEditor(dados) {    
    socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

//função para emitir ao servidor a exclusão do documento
function emitirExcluirDocumento(nome) {
    socket.emit("excluir_documento", nome)
}

//Escutando evento de documento excluido
socket.on("excluir_documento_sucesso", (nome) => {
    //Alertar uma caixa de dialogo e redirecionar pagina
    alertarERedirecionar(nome);
})

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };