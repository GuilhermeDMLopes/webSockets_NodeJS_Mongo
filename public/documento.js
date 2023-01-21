const socket = io();

//Pegando elemento do id em text area
//Isso guarda um elemento html em uma variavel do JS
const textoEditor = document.getElementById("editor-texto");

//Conceito de evento em JS
//Keyup é quando alguem solta um tecla
//Quando alguem soltar uma tecla, ira ocorrer o evento dentro da função
textoEditor.addEventListener("keyup", () => {
    //Como a alteração foi feita no FrontEnd, esse console.log não ira aparecer no terminal e sim no navegador
    //Sempre que fizermos uma atualização no FrontEnd, precisamos atualizar a pagina para carregar as alterações
    //console.log("Soltou tecla!")
    //Queremos mostrar o texto que foi escrito no editor
    //console.log(textoEditor.value)
    //A partir de agora, posso enviar a informação para o backend
    //Vamos emitir um evento para o backend/servidor
    //Os parametros são: o nome do evento que quero emitir, levar junto com esse elemento algum dado
    socket.emit("texto_editor", textoEditor.value)
})

//Escutando do lado do cliente o texto proveniente do backend
//Parametros: nome do evento vindo do backEnd, função que sera executada quando evento for escutado
socket.on("texto_editor_clientes", (texto) => {
    //Pegando o texto vindo do backEnd pelo parametro texto
    //Com isso, o texto escrito em uma aba de um cliente, sera escrito no console da outra aba de outro cliente
    //console.log(texto)
    //Atualizando a tela do outro cliente
    textoEditor.value = texto;
})
