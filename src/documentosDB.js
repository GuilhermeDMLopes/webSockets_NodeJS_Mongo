//Arquivo de configuração e alteração do BD
import { documentosColecao } from "./dbConnect.js"

function encontrarDocumento(nome) {
    //Recebendo a coleção do mongo DB e encnontrar documento
    const documento = documentosColecao.findOne({
        //encontra o documento passado como parametro
        nome: nome
        //ou apenas: nome
    })

    return documento
}

//Criando função para atualizar documento com o texto digitado
function atualizaDocumento(nome, texto) {
    //faz a atualização do documento atual
    const atualizacao = documentosColecao.updateOne({
        nome: nome
    }, {
        //O que deve ser feito com o documento encontrado, no MongoDB
        $set: {
            //Troca o texto original pelo texto escrito
            texto: texto
        }
    })

    return atualizacao;
}

export { encontrarDocumento, atualizaDocumento }