import express, {Request, Response, ErrorRequestHandler} from "express";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/api";
import cors from 'cors';
//import Objecterror do Multer
import { MulterError } from "multer"; 

// Instanciando o uso de variáveis de ambiente
dotenv.config();

// Instanciando o server
const server = express();

// Definindo o uso do cors
server.use(cors({
//Permitindo o acesso por uma origem específica
    //origin: 'http:www.uol.com'
//Permitindo acesso geral
    origin: '*',
//Métodos liberados
    methods: ['GET']

    
}));

//Definindo o caminho estático para pasta public
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
