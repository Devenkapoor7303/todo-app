const Agendash = require('agendash');
const basicAuth = require('express-basic-auth');
const jwt=require("jsonwebtoken");
const AuthService=require("../services/AuthService");
const TaskService=require("../services/TaskService");


exports = module.exports = class TaskController {

    constructor(router) {
        // config routes
        router.use("/task",AuthService.authenticateToken);
        router.get("/task/read",this.showAllTasks);
        router.get("/task/create",this.createTaskFormPage);
        router.get("/task/update",this.updateTaskFormPage);
        router.get("/task/delete",this.deleteTaskFormPage);
        router.post("/task/create",this.createTask);
        router.post("/task/update",this.updateTask);
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
        res.render("updateTask");
    }

    async deleteTaskFormPage(req,res){
        await TaskService.delete()
    }

    async createTask(req,res){
        const {task,duedate,status,email}=req.body;
        await TaskService.create(task,duedate,status,email);
        res.redirect("/task/read");

    }
    async updateTask(req,res){
        const {task,duedate,status,email}=req.body;
        await TaskService.update(task,duedate,status,email);
        res.redirect("/task/read");
    }
};
