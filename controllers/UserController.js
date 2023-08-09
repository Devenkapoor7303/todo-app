const Agendash = require('agendash');
const basicAuth = require('express-basic-auth');
const UserService=require("../services/UserService");
const jwt=require("jsonwebtoken");

exports = module.exports = class UserController {

    constructor(router) {
        // config routes
        router.get('/signup',this.signUpUserPage);
        router.get('/login',this.loginUserPage);
        router.post('/signUp',this.createUser);
        router.post('/signin',this.loginUser);
        log.info('Routed', this.constructor.name);
    }

    async loginUserPage(req,res){
        const accessToken=req?.cookies.token;
        if(accessToken){
            return res.redirect('/task/read');
        }
        return res.render('login');
    }

    async signUpUserPage(req, res){
        return res.render('SignUp');
    }

    async createUser(req,res){
        const {email,password}=req.body;
        if(!email || !password){
            return res.json({message:"Invalid Input"});
        }
        const oldUser=await UserService.find(email);
        if(oldUser){
            return res.json({message:"User Already Exists"});
        }
        const user=await UserService.create(email,password);
        const accessToken=jwt.sign({email},"devenkapoor");
        res.cookie("token",accessToken);
        return res.json({message:"User Created"});
    }

    async loginUser(req,res){
        const {email}=req.body;

        const accessToken=jwt.sign({email},"devenkapoor");
        res.cookie("token",accessToken);
        //req.logout();
        return res.redirect("/task/read");
    }
};
