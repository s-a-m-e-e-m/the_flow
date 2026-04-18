const taskModel = require("../models/task.model");

const addTasks = async (req, res) => {
    const { tasks, deadline } = req.body;

    if(!tasks){
        return res.status(400).json({
            message: "Tasks are required."
        })  
    }
    
    try {

        const user = req.user;
        
        await taskModel.insertMany(tasks.map(task => ({ title: task.title, user: user.id, deadline: task.deadline || null  })));
        const updatedTasks = await taskModel.find({ user: user.id });

        return res.status(200).json({
            message: "Tasks added successfully.",
            tasks: updatedTasks
        })
    } catch (error) {
        console.error("Error adding tasks:", error);
        return res.status(500).json({
            message: "An error occurred while adding the tasks."
        })
    }
}

const getTasks = async (req, res) => {
    const user = req.user;
    const tasks = await taskModel.find({ user: user.id }).select("-user -__v").lean();
    return res.status(200).json({
        message: "Tasks fetched successfully.",
        tasks: tasks
    });
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    if(!taskId){
        return res.status(400).json({
            message: "Task ID is required."
        })
    }
    const user = req.user;
    const task = await taskModel.findOneAndDelete({ _id: taskId, user: user.id });
    return res.status(200).json({
        message: "Task deleted successfully.",
        task: task
    });
};

const updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { newStatus } = req.body;

    const user = req.user;

    if(!taskId || !newStatus){
        return res.status(400).json({
            message: "Task ID and new status are required."
        })
    }

    await taskModel.findOneAndUpdate({ _id: taskId, user: user.id }, { status: newStatus }, { returnDocument: "after" });
    const updatedTasks = await taskModel.find({ user: user.id });
    return res.status(200).json({
        message: "Task status updated successfully.",
        tasks: updatedTasks
    });
}

const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title } = req.body;

    const user = req.user;
    if(!taskId || !title){
        return res.status(400).json({
            message: "Task ID and new title are required."
        })
    }

    const updatedTask = await taskModel.findOneAndUpdate({ _id: taskId, user: user.id }, { title }, { returnDocument: "after" });
    return res.status(200).json({
        message: "Task updated successfully.",
        task: updatedTask
    });
}

const updateTaskDeadline = async (req, res) => {
    const { taskId } = req.params;
    const { newDeadline } = req.body;
    
    const user = req.user;
    const updatedTask = await taskModel.findByIdAndUpdate({ _id: taskId, user: user.id },{ deadline: newDeadline }, { returnDocument: "after" });

    return res.status(200).json({
        message: "Task deadline updated successfully.",
        task: updatedTask
    })
}

module.exports = { addTasks, getTasks, deleteTask, updateTaskStatus, updateTask, updateTaskDeadline };