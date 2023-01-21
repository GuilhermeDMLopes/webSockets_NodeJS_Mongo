import io from "./servidor.js"

//Array de objetos em que cada objeto ira representar as informações do documento

const documentos = [
    {
        nome: "JavaScript",
        texto: "Texto de javascript..."
    },
    {
        nome: "Node",
        texto: "Texto de node..."
    },
    {
        nome: "Socket.io",
        texto: "Texto de socket.io..."
    }
]

io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ", socket.id)

    /*socket.on("selecionar_documento", (nomeDocumento) => {
        //Quando o servidor escutar o evento, ele ira retornar o documento 
        //variavel alterada
        const documento = encontrarDocumento(nomeDocumento)
        //console.log(documento)       
        socket.join(nomeDocumento)

        //Tratando erro caso ele não encontre nenhum documento
        if(documento) {
            //enviando documento de volta para o front end desse socket
            socket.emit("texto_documento", documento.texto)
        }
    })*/

    //Outro método
    socket.on("selecionar_documento", (nomeDocumento, devolverTexto) => {
        //variavel alterada
        const documento = encontrarDocumento(nomeDocumento)
        //console.log(documento)       
        socket.join(nomeDocumento)

        //Tratando erro caso ele não encontre nenhum documento
        if(documento) {
            //enviando documento de volta para o front end desse socket
            //um dado como qualquer outro recebido por parametro dos eventos do socket IO
            devolverTexto(documento.texto)
        }
    })
  
    socket.on("texto_editor", ({texto, nomeDocumento}) => {
        //Salvando as mensagens localmente
        //pegando documento
        const documento = encontrarDocumento(nomeDocumento)

        //Se o documento existir, salva o texto
        if(documento) {
            documento.texto = texto
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto)
        }
              
    })
})

//Função para encontrar documento
function encontrarDocumento(nome) {
    //Variavel recebe a lsita de documentos que ciramos no inicio do arquivo
    const documento = documentos.find((documento) => {
        //retorna o documento que recebemos o nome como parametro
        return documento.nome === nome;
    });

    return documento
}