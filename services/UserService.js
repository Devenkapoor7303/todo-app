/**
 * interceptor for user permissions
 * */



class UserService {

    static async create(email,password) {
        // const user=await;
        const user =await _db.User.create({
            email,
            password
        });
        return user;
    }

    static async update(email,newPassword){
        const user=await _db.User.findOneAndUpdate({email:email},{password:newPassword});
        return user;
    }

    static async find(email){
        const user=await _db.User.findOne({email});
        return user;
    }
}

exports = module.exports = UserService;
