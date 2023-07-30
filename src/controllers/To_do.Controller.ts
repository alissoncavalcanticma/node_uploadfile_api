import { Request, Response } from 'express';
import { To_do } from '../models/To_do.Model';

export const listTasks = async (req: Request, res: Response) => {
    let tasks = await To_do.findAll();
    
    res.json({tasks});
}

export const createTask = async (req: Request, res: Response) => {
    if(req.body.title){
        let {title, done} = req.body;

        let newTask = await To_do.create({
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

        let task = await To_do.findByPk(id);
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
        let task = await To_do.findByPk(id);
        if(task){
            await To_do.destroy({
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