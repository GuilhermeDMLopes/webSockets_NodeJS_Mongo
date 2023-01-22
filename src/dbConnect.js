//Arquivo de configuração de conexão com o banco
//Importando client para utilizar com nosso BD
import { MongoClient} from "mongodb";

//Criamos a conexão com o Mongo atraves da string de conexão
const cliente = new MongoClient("mongodb+srv://alura:alura123@alura.r4glodr.mongodb.net/?retryWrites=true&w=majority")

//Exportando a coleção para utilizarmos em outros arquivos
let documentosColecao;

//Tratativa para sabermos se conseguimos conectar com sucesso
try {
    await cliente.connect();

    //Conectando ao DB do mongo
    const db = cliente.db("alura-websockets");
    //pegando collections
    documentosColecao = db.collection("documentos")

    console.log("Conectado ao Banco de dados com sucesso!")
}catch (erro) {
    console.log(erro)
}

export { documentosColecao }