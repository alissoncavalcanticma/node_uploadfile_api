/* These lines of code are importing various modules and dependencies that are needed for the
TypeScript server to function properly. */
import express, {Request, Response, ErrorRequestHandler} from "express";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/api";
import cors from 'cors';
//import Objecterror do Multer
import { MulterError } from "multer"; 

// Instanciando o uso de variáveis de ambiente
/* `dotenv.config();` is a function call that loads the environment variables from a `.env` file into
the Node.js process. The `.env` file contains key-value pairs of environment variables that are
specific to the application. By calling `dotenv.config()`, the application can access these
environment variables using `process.env`. */
dotenv.config();

// Instanciando o server
/* `const server = express();` is creating an instance of the Express server. It initializes and sets
up the server to handle HTTP requests and responses. This instance is stored in the `server`
constant, which can be used to configure and start the server. */
const server = express();

// Definindo o uso do cors
/* The code `server.use(cors({ origin: '*', methods: ['GET'] }))` is configuring the server to use the
CORS (Cross-Origin Resource Sharing) middleware. CORS is a mechanism that allows resources (e.g.,
APIs) on a web page to be requested from another domain outside the domain from which the resource
originated. */
server.use(cors({
//Permitindo o acesso por uma origem específica
    //origin: 'http:www.uol.com'
//Permitindo acesso geral
    origin: '*',
//Métodos liberados
    methods: ['GET', 'POST']

    
}));

//Definindo o caminho estático para pasta public
/* `server.use(express.static(path.join(__dirname, '../public')))` is configuring the server to serve
static files from the "public" directory. This means that any files in the "public" directory can be
accessed directly by the client without any additional routing or processing. */
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

// Definindo para receber body em Json
server.use(express.json());
// Definindo o uso o das rotas criadas
server.use(router);

// Definindo o recursos para rotas não definidas
server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({
        error: "Endpoint não encontrado."
    });
})
//Tratamento de errors
const errorHandler: ErrorRequestHandler = (err, req, res, next) =>{
    res.status(400);
    if(err instanceof MulterError){
        res.json({error: err.code});
    }else{
        console.log(err);
        res.json({error: "Ocorreu um erro!"})
    }
}

server.use(errorHandler);

// Startando a escuta do server na porta definida
server.listen(process.env.PORT);
