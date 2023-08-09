/**
 * interceptor for user permissions
 * */
// {
//     _id: 64d34cba5fdb32c1eb58710d,
//     task: 'emailMe',
//     DueDate: '17/12/2024',
//     Status: 'Pending',
//     AssignedTo: 'deven.kapoor1999@gmail.com',
//     __v: 0
//   }
  



class TaskService {

    static async create(task,duedate,status,assignedto) {
        const newTask =await _db.Task.create({
            task:task,
            DueDate:duedate,
            Status:status,
            AssignedTo:assignedto
        });
        return task;
    }

    static async update(id,details){
        console.log(id,details);
        const user=await _db.Task.findByIdAndUpdate(id,details);
        console.log(user);
        return ;
    }

    static async find(){
        const tasks=await _db.Task.find({});
        return tasks;
    }

    static async delete(id){
        await _db.Task.findByIdAndDelete(id);
        return ;
    }
}

exports = module.exports = TaskService;
