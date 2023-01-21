import { atualizaTextoEditor } from "./documento.js";

const socket = io();

/*function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome)
}*/

//Usando o outro método
function selecionarDocumento(nome) {
    socket.emit("selecionar_documento", nome, (texto) => {
        atualizaTextoEditor(texto)
    })
}

function emitirTextoEditor(dados) {    
    socket.emit("texto_editor", dados);
}

//Recebe o documento do servidor e completa o campo de texto com o texto do parametro
/*socket.on("texto_documento", (texto) => {
    //console.log(texto) mostra o texto no console
    //Atualiza o campo de texto de cada sala/documento
    atualizaTextoEditor(texto)
})*/

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

export { emitirTextoEditor, selecionarDocumento };