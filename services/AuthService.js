const jwt= require("jsonwebtoken");
const UserService=require("./UserService");

class AuthService {
    static async authenticateToken(req,res,next){
        const accessToken=req?.cookies.token;
        const {email}=req.body;
        if(!accessToken){
            const user=await UserService.find(email);
            if(!user){
                return res.json({message:"Invalid Credentails"});
            }
            req.user=user;
            next();
        }
        jwt.verify(accessToken,"devenkapoor",(err,user)=>{
            if(err) return res.json({message:err});
            req.user=user;
            next();
        })
    }
}

exports = module.exports = AuthService;