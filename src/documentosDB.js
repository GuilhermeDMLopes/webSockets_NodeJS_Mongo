import { documentosColecao } from "./dbConnect.js"

//Criando função para obter documentos
function obterDocumentos() {
    //Retornar um cursos em um array do JS
    const documentos = documentosColecao.find().toArray();
    return documentos;
}

//Função para adicionar documento
function adicionarDocumento(nome) {
    //Adiciona um documento com o nome passado e o texto do documento vazio
    const resultado = documentosColecao.insertOne({
        nome: nome,
        texto: ""
    });

    return resultado;
}

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome: nome
    })

    return documento
}

function atualizaDocumento(nome, texto) {
    const atualizacao = documentosColecao.updateOne({
        nome: nome
    }, {
        $set: {
            texto: texto
        }
    })

    return atualizacao;
}

//Função para excluir documento
function excluirDocumento(nome) {
    const resultado = documentosColecao.deleteOne({
        nome: nome
        //Ou apenas nome
    })

    return resultado
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento }