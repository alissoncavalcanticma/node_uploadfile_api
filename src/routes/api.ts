import { Router } from "express";
import * as Api_Controller from '../controllers/Api.Controller';

//import Multer
import multer from "multer";

const upload = multer({
    dest: "./tmp"
});

const router = Router();

//Multer endpoints usando midleware
router.post("/upload", upload.single('file'), Api_Controller.uploadFile);



export default router;