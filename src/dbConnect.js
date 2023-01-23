import { MongoClient} from "mongodb";

const cliente = new MongoClient("mongodb+srv://alura:alura123@alura.r4glodr.mongodb.net/?retryWrites=true&w=majority")

let documentosColecao;

try {
    await cliente.connect();

    const db = cliente.db("alura-websockets");
    documentosColecao = db.collection("documentos")

    console.log("Conectado ao Banco de dados com sucesso!")
}catch (erro) {
    console.log(erro)
}

export { documentosColecao }