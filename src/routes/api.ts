import { Router } from "express";
import * as Api_Controller from '../controllers/Api.Controller';

//import Multer
import multer from "multer";

//Storage Upload File
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        //usando o callback para definir o destino
        //null porque não tem definido um tratamento de erro no momento
        cb(null, './tmp');
    },
    filename: (req, file, cb) => {
        //usando o callback para definir o nome
        //null porque não tem definido um tratamento de erro no momento
        cb(null, file.fieldname+"_"+Date.now()+".jpg");
    }
});

//Instanciando Multer em const upload
const upload = multer({
    //dest: "./tmp" -> Basic Storage File
    //storage: multer.memoryStorage(); -> Save in memory
    storage: storageConfig, //Using custom config 
    //Filter/Conditions of receiver files
    fileFilter: (req, file, cb) => {
        //defining mimetypes accepted
        const allowed: string[] = ['image/png'];
        cb(null, allowed.includes(file.mimetype));
        /*
        if(allowed.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(null, false);
        }
        */
    },
    limits: {
        fileSize: 2000000
    }
});

const router = Router();

//Multer endpoints usando midleware no modo Single
router.post("/upload", upload.single('avatar'), Api_Controller.uploadFile);

//Multer endpoints usando midleware no modo Multiple com Array
//router.post("/upload", upload.array('file', 2), Api_Controller.uploadFile);

//Multer endpoints usando midleware no modo Multiple com Fields, especificando os nomes recebidos
/*
router.post("/upload", upload.fields([
    {name: "avatar", maxCount:1},
    {name: "files", maxCount:2}
]), Api_Controller.uploadFile);
*/



export default router;