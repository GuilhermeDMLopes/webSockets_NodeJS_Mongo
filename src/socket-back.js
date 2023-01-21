import io from "./servidor.js"

io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ", socket.id)

    //Recebendo informação com nome da sala/documento do front
    socket.on("selecionar_documento", (nomeDocumento) => {
        //Sera mostrado no terminal o nome da sala/documento
        //console.log(nomeDocumento)
        //Vai pegar o socket conectado no momento e colocar numa sala com o nome do documento
        //Sala agrupa clientes que estão conectados no mesmo lugar
        socket.join(nomeDocumento)
    })

    /*
    socket.on("texto_editor", (texto, nomeDocumento) => {
        //socket.broadcast.emit("texto_editor_clientes", texto)
        //Vai emitir o mesmo evento emitido antes. O texto sera enviado para os clientes que estão 
        //concetados na sala/documento de JavaScript
        //No entanto, quem esta na sala/Documento Node, consegue enviar para quem esta em JS
        //socket.to("JavaScript").emit("texto_editor_clientes", texto)  
        //Agora cada sala/Documento sera escutada em sua respectiva sala/documento
        socket.to(nomeDocumento).emit("texto_editor_clientes", texto)      
    })*/

    //Mesma função anterior porém recebendo um objeto como parametro
    //Pega as propriedades texto e nomeDocumento do objeto
    socket.on("texto_editor", ({texto, nomeDocumento}) => {
        socket.to(nomeDocumento).emit("texto_editor_clientes", texto)      
    })
})