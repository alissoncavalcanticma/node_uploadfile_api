import { Request, Response } from 'express';
import { Api } from '../models/Api.Model';


export const uploadFile = async (req: Request, res: Response) => {
    res.json(req.file);
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