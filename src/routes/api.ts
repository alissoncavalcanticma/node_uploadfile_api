import { Router } from "express";
import * as Api_Controller from '../controllers/Api.Controller';

//import Multer
import multer from "multer";

const upload = multer({
    dest: "./tmp"
});

const router = Router();

//Multer endpoints usando midleware no modo Single
//router.post("/upload", upload.single('file'), Api_Controller.uploadFile);

//Multer endpoints usando midleware no modo Multiple com Array
//router.post("/upload", upload.array('file', 2), Api_Controller.uploadFile);

//Multer endpoints usando midleware no modo Multiple com Fields, especificando os nomes recebidos
router.post("/upload", upload.fields([
    {name: "avatar", maxCount:1},
    {name: "files", maxCount:2}
]), Api_Controller.uploadFile);



export default router;