import { adicionarDocumento, atualizaDocumento, encontrarDocumento, excluirDocumento, obterDocumentos } from "./documentosDB.js"
import io from "./servidor.js"

io.on("connection", (socket) => {
    //console.log("Um cliente se conectou! ID: ", socket.id)
    //Escutando evento vindo de socket-front-index.js
    socket.on("obter_documentos", async (devolverDocumentos) => {
        //console.log("O cliente está solicitando os documentos!")
        //solicitar os documentos do banco de dados
        const documentos = await obterDocumentos()
        //Mostra a lista de objetos no bd
        //console.log(documentos)
        //Devolve os documentos para o frontend
        devolverDocumentos(documentos)
    })

    //Recebe o evento com o campo de texto do FrontEnd
    socket.on("adicionar_documento", async (nome) => {
        //Iremos verificar se o documento já existe no banco
        //Se ele não encontrar nenhum documento, ele irá retornar null.
        const documentoExiste = (await encontrarDocumento(nome)) !== null;
        
        if(documentoExiste) {
            //enviando para o front a informação que o documento existe
            socket.emit("documento_existente", nome)
        } else {
            //mostra o nome do documento
            //console.log(nome)
            //Salvando no banco
            const resultado = await adicionarDocumento(nome)
    
            //imprimindo novo objeto no console
            //console.log(resultado)
            //Validando a inserção
            //Dentro do objeto mostrado no terminal. temos a informação acknowledged:true
            if(resultado.acknowledged) {
                //Se for validado, atualizar os clientes na pagina inicial
                io.emit("adicionar_documento_interface", nome)
            }
        }

    })

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        
        const documento =  await encontrarDocumento(nomeDocumento)
        
        socket.join(nomeDocumento)

        if(documento) {
            devolverTexto(documento.texto)
        }
    })
    
    socket.on("texto_editor", async ({texto, nomeDocumento}) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto)

        if(atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto)
        }
              
    })

    //Escutando evento para excluir documento
    socket.on("excluir_documento", async (nome) => {
        //Pegando nome do documento que deve ser excluido
        //console.log(nome)

        //excluindo no banco
        const resultado = await excluirDocumento(nome);

        //console.log(resultado)
        //Validando exclusão
        if(resultado.deletedCount) {
            //Se o documento for excluido, iremos emitir para todos os clientes
            io.emit("excluir_documento_sucesso", nome)
        }
    })
})
