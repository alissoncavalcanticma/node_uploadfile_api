import { Request, Response } from 'express';
import { Api } from '../models/Api.Model';
import sharp from 'sharp';

//import de lib para uso no delete de imagens temporárias
import { unlink } from 'fs/promises';


/**
 * The function `uploadFile` is an asynchronous function that handles file uploads in a TypeScript
 * environment.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, request
 * URL, and other relevant details.
 * @param {Response} res - The `res` parameter is the response object that is used to send a response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as `json()` which is used to send a JSON response.
 */
export const uploadFile = async (req: Request, res: Response) => {
    
    //Handling Image upload form lib sharp

    if(req.file){
        //Carregando Imagem
        //Redimensionado com parâmetros de Largura? X Altura?
        //Definindo o tipo após redimensionar
        //Definindo o local de salvamento
        await sharp(req.file?.path)
                .resize(50, 50, {
                    //propriedade de achatar para caber
                    //fit: sharp.fit.fill
                    //propriedade que pega proporcional
                    fit: sharp.fit.cover,
                    //propriedade que define a posição de consideração do ajuste acima, default = center // center, top, bottom, left, right
                    position: 'center'
                })
                .toFormat('jpeg')
                .toFile(`./public/media/${req.file?.filename}.jpg`);

        res.json({image: `${req.file?.filename}.jpg`}).status(200);
    }else{
        res.status(400);
        res.json({error: "Arquivo inválido ou não recebido!"});
    }


    //Definido type Multer para tratamento do upload
    /*     
    type UploadTypes = {
        avatar: Express.Multer.File[],
        files: Express.Multer.File[]
    }
    */
    //Tratando a chave do array, definindo um type Multer com o type criado acima.
    /*
    const files = req.files as UploadTypes;
    console.log("Avatar", files.avatar);

    res.json(req.files);
    */
    //res.json(req.file);
}




export const listTasks = async (req: Request, res: Response) => {
    let tasks = await Api.findAll();
    
    res.json({tasks});
}

export const createTask = async (req: Request, res: Response) => {
    if(req.body.title){
        let {title, done} = req.body;

        let newTask = await Api.create({
            title: title,
            done: done ? true : false
        });

        res.status(201).json({msg: "Task criada com sucesso!", id: newTask.id});
    }else{
        res.json({msg: "Nenhum body recebido!"});
    } 
}

export const updateTask = async (req: Request, res: Response) => {
    if(req.params.id){
        let id = req.params.id;

        let task = await Api.findByPk(id);
        if(task){
            task.title = req.body.title;
            task.done = req.body.done;

            task.save();
            res.json({msg: "Registro alterado com sucesso."});
        }
    }else{
        res.json({msg: "Nenhum id recebido!"});
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    if(req.params.id){
        let id = req.params.id;
        let task = await Api.findByPk(id);
        if(task){
            await Api.destroy({
                where:{id}
            });

            res.json({msg: "Task deletada com sucesso!"});
        }else{
            res.json({msg: "Número de task informado não existe!"});
        }

    }else{
        res.json({msg: "Nenhum id recebido!"});
    }
}