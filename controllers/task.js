const Task = require('../model/task');
const asyncWrapper = require('../midddleware/asynwrapper');
const customApiError = require('../error/custom-error')


const getAllTasks = asyncWrapper( async (req, res) =>{

       const tasks = await Task.find({});
       res.status(200).json({tasks})    // you can use just two lines of code instead of try catch as a middleware
       
})

const createTasks = asyncWrapper( async (req, res) =>{

               const task = await Task.create(req.body) 
        res.status(201).json({task});/// es6 {tasks: tasks}  equal to {task}
        //    res.status(200).json({tasks,amount : task.length})  
        //    res
        //    .status(200)
        //    .json({ status :'success', data: {tasks, nbHits: tasks.length}})  

    
})
const getTasks = asyncWrapper( async (req, res, next) =>{
   const {id:taskID} = req.params;
  const task = await Task.findOne({_id : taskID}) ;

  if(!task){
    // const error = new Error("Not Found!! cannot get it");   // option 1 manual setup
    //  error.status = 404;               // this is a custom error handler 
    //  return next(error);     
    //  return res.status(404).json({ msg: `No Task with id ${taskID}`});   // this is option 2
   
    // option 3 you can middleware or new api use instead of this method 
    return next(createCustomError(`No tasks with id : ${taskID}`,404))  
     
  }
   return res.status(200).json({task}) 
      
})



const deleteTasks = asyncWrapper(async (req, res, next) =>{

    const { id :taskID} =  req.params;
    const task = await Task.findOneAndDelete({ _id: taskID})

    if(!task){
    return next(createCustomError(`No tasks with id : ${taskID}`,404))  
         
    }
     
     res.status(200).json({ task })

     
} )


const updateTasks = asyncWrapper( async (req, res) =>{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
        new:true, runValidators:true});
    
        if(!task){
      return res.status(404).json({ msg: `No Task with Id : ${taskID}`});
    }
     res.status(200).json({ task })
    //  res.status(200).send("updated")
 
})

const editTask = asyncWrapper(  async (req, res) =>{
    const {id:taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
        new:true, 
        runValidators:true,
        overwrite : true,});
    
        if(!task){
    return next(createCustomError(`No tasks with id : ${taskID}`,404))  
    // return res.status(404).json({ msg: `No Task with Id : ${taskID}`});
    }
     res.status(200).json({ task })
    //  res.status(200).send("updated")
    
      
})

module.exports = { getAllTasks , 
                   createTasks,
                   getTasks,
                   updateTasks,
                deleteTasks,
                 editTask}