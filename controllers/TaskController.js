const Agendash = require('agendash');
const basicAuth = require('express-basic-auth');
const jwt=require("jsonwebtoken");
const AuthService=require("../services/AuthService");
const TaskService=require("../services/TaskService");
const MailService=require("../services/MailService");


exports = module.exports = class TaskController {

    constructor(router) {
        // config routes
        router.use("/task",AuthService.authenticateToken);
        router.get("/task/read",this.showAllTasks);
        router.get("/task/create",this.createTaskFormPage);
        router.get("/task/update/:id",this.updateTaskFormPage);
        router.get("/task/delete/:id",this.deleteTaskFormPage);
        router.post("/task/create",this.createTask);
        router.post("/task/update/:id",this.updateTask);
        log.info('Routed', this.constructor.name);
    }

    async showAllTasks(req,res){
        const tasks=await TaskService.find();
        res.render("task",{data:tasks});
    }

    async createTaskFormPage(req,res){
        res.render("createTask");
    }

    async updateTaskFormPage(req,res){
        const id=req.params.id;
        res.render("updateTask",{id:id});
    }

    async deleteTaskFormPage(req,res){
        const id=req.params.id;
        await TaskService.delete(id);
        res.redirect("/task/read");
    }

    async createTask(req,res){
        const {task,duedate,status,email}=req.body;
        await TaskService.create(task,duedate,status,email);
        await MailService.sendMail(email,"deven.kapoor1999@gmail.com");
        res.redirect("/task/read");

    }
    async updateTask(req,res){
        const details=req.body;
        const id=req.params.id;
        await TaskService.update(id,details);
        res.redirect("/task/read");
    }
};
