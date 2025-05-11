// server.js
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const TASKS_FILE = "tasks.json";

app.use(express.json());

// Load tasks from file or initialize empty array
const loadTasks = () => {
    if (fs.existsSync(TASKS_FILE)) {
        return JSON.parse(fs.readFileSync(TASKS_FILE, "utf-8"));
    }
    return [];
};

const saveTasks = (tasks) => {
    if (!fs.existsSync(TASKS_FILE)) {
        fs.writeFileSync(TASKS_FILE, '[]'); 
    }
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

app.get('/',(req,res)=>[
    res.json("Working")
])

app.post("/tasks", (req, res) => {
    const tasks = loadTasks();
    const newTask = { id: tasks.length + 1, text: req.body.text ,status:'Todo',createdAt:new Date(),updatedAt:new Date()};
    tasks.push(newTask);
    saveTasks(tasks);
    res.json({ message: "Task added successfully", task: newTask });
});

app.delete("/tasks", (req, res) => {
    try {
        const tasks = loadTasks();
        if (req.body.id <= tasks.length) {
            const updatedTasks = tasks.filter(task => task.id !== req.body.id)
            saveTasks(updatedTasks);
            res.json({ message: "Task Deleted successfully", task: updatedTasks, id: req.body.id });
        }
        else {
            res.json({ message: 'Not Existing', id: req.body.id })
        }
    } catch (error) {
        res.json({ message: error })
    }
});

app.put("/tasks", (req, res) => {
    try {
        const tasks = loadTasks();
        console.log(req.body);
        if (req.body.id <= tasks.length) {
            if(req.body.text ==='' && req.body.description==='')res.json({message:'Dont Waste API Calls',id :req.body.id})
            const updatedTasks = tasks.map(task => {
                if(task.id === req.body.id)
                    return {...task,text:req.body.text,description:req.body.description,updatedAt:new Date()}
                return task
            })
            saveTasks(updatedTasks);
            res.json({ message: "Task Updated successfully", task: updatedTasks, id: req.body.id });
        }
        else {
            res.json({ message: 'Not Existing', id: req.body.id })
        }
    } catch (error) {
        res.json({ message: error })
    }
});

app.put("/status", (req, res) => {
    try {
        const tasks = loadTasks();
        console.log(req.body);
        if (req.body.id <= tasks.length) {
            const updatedTasks = tasks.map(task => {
                if(task.id === req.body.id)
                    return {...task,status:req.body.status}
                return task
            })
            saveTasks(updatedTasks);
            res.json({ message: "Status Updated successfully", task: updatedTasks, id: req.body.id });
        }
        else {
            res.json({ message: 'Not Existing', id: req.body.id })
        }
    } catch (error) {
        res.json({ message: error })
    }
});
app.get('/list',(req,res)=>{
    try {
        const tasks = loadTasks();
        const {filter} = req.query;
    if(filter==="done" || filter==="todo" || filter==="in-progress"){
            const filteredTasks = tasks.filter((task)=>task.status===filter)
            res.json({data:filteredTasks,message:'Sent Successfully'})
            return;
        }
        res.json({data:tasks,message:'Sent Successfully'})
    } catch (error) {
        res.json({ message: error })
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));