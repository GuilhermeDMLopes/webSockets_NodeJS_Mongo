//Arquivo contendo contendo a responsabilidade de fazer a conexão websocket
//Importando IO
import io from "./servidor.js"

//Essa função pode trazer alguns parametros do evento, um deles é o proprio socket
io.on("connection", (socket) => {
    //O socket vai ser disponibilizado por cada conexão feita com o cliente pelo servidor
    console.log("Um cliente se conectou! ID: ", socket.id)

    //Escutando evento do frontEnd/cliente
    //Para cada cliente conectando no nosso servidor, ele ficara escutando este evento
    //Parametro: nome do evento emitido pelo cliente, função que sera executada quando cliente for escutado
    //'texto' é o que vem do segundo parametro de socket.emit("texto_editor", textoEditor.value) la do front
    socket.on("texto_editor", (texto) => {
        //Escreve no terminal o que estamos escrevendo no front
        //console.log(texto)
        //Para emitir o evendo para os demais clientes, fazemos
        //io.emit("texto_editor_clientes", texto)
        //Usando o socket.broadcast, o texto escrito em um cliente, será enviado para todos os cliente,
        //menos para o cliente proveniente deste envio
        socket.broadcast.emit("texto_editor_clientes", texto)

    })
  })