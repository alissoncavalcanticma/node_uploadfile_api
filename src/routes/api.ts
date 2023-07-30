import { Router } from "express";
import * as To_do_Controller from '../controllers/To_do.Controller';

const router = Router();

router.get("/to_do", To_do_Controller.listTasks);
router.post("/to_do", To_do_Controller.createTask);
router.put("/to_do/:id", To_do_Controller.updateTask);
router.delete("/to_do/:id", To_do_Controller.deleteTask);

export default router;