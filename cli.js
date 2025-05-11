#!/usr/bin/env node
const axios = require("axios");
const { text } = require("express");
const args = process.argv.slice(2);

if (args[0] === "add" && args[1]) {
    axios.post("http://localhost:3000/tasks", { text: args.slice(1).join(" ") })
        .then(response => console.log(response.data.message, `(ID: ${response.data.task.id})`))
        .catch(error => console.error("Error adding task:", error.response?.data || error.message));
} 
else if (args[0] === "delete" && args[1]){
    axios.delete("http://localhost:3000/tasks",{
        data: { id: Number(args[1]) }
    })
    .then(response => console.log(response.data.message, `(ID: ${response.data.id})`))
    .catch(error => console.error("Error Deleting task:", error.response?.data || error.message));

}
else if (args[0] === "update" && args[1] || args[2] || args[3]){
    axios.put("http://localhost:3000/tasks",{
     id: Number(args[1]),text:args.slice(2,3).join(""),description:args.slice(3).join(""),
    })
    .then(response => console.log(response.data.message, `(ID: ${response.data.id})`))
    .catch(error => console.error("Error Updating task:", error.response?.data || error.message));
}
else if (args[0] === "mark-in-progress" && args[1]){
    axios.put("http://localhost:3000/status",{
     id: Number(args[1]),status:'in-progress'
    })
    .then(response => console.log(response.data.message, `(ID: ${response.data.id})`))
    .catch(error => console.error("Error Updating task:", error.response?.data || error.message));
}
else if (args[0] === "mark-done" && args[1]){
    axios.put("http://localhost:3000/status",{
     id: Number(args[1]),status:'done'
    })
    .then(response => console.log(response.data.message, `(ID: ${response.data.id})`))
    .catch(error => console.error("Error Updating task:", error.response?.data || error.message));
}
else if(args[0]==="list"){
if(args[1]==="done" || args[1]==="todo" || args[1]==="in-progress"){
    axios.get(`http://localhost:3000/list?filter=${args[1]}`)
    .then(response => console.log(response.data.message, response.data))
    .catch(error => console.error("Error Updating task:", error.response?.data || error.message));
    return;
}
axios.get(`http://localhost:3000/list?filter=all}`)
    .then(response => console.log(response.data.message, response.data))
    .catch(error => console.error("Error Updating task:", error.response?.data || error.message));

}

else {
    console.log("Usage: task-cli add \"Task description\"");
}