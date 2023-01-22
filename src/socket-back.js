//Importando encontrarDocumento
import { atualizaDocumento, encontrarDocumento } from "./documentosDB.js"
import io from "./servidor.js"

io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID: ", socket.id)

    //Colocando async await para receber dados do banco
    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        
        const documento =  await encontrarDocumento(nomeDocumento)
        //console.log(documento)
        
        socket.join(nomeDocumento)

        if(documento) {
            devolverTexto(documento.texto)
        }
    })
    
    //Alterando para trabalhar com MongoDB
    socket.on("texto_editor", async ({texto, nomeDocumento}) => {
        //Atualizando o campo de texto pelo texto digitado
        const atualizacao = await atualizaDocumento(nomeDocumento, texto)

        //console.log(atualizacao)
        //Verificando se houver atualização
        //ModifiedCount > 0 quer dizer que teve alteração
        if(atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto)
        }
              
    })
})
