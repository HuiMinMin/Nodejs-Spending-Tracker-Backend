const sqlite3 = require('sqlite3').verbose();
var express = require("express");
var app = express();
const AppDAO = require('./db/dao');
const TodoRepository = require('./db/TodoRepository');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dao = new AppDAO('./database.sqlite3');
const todoRepo = new TodoRepository(dao);

//Get all rows
app.get("/todoList", (req, res) => {
    todoRepo.getAll().then((todoItems) => { res.json(todoItems) } );
    return res;
});

//Post one row
app.post('/todoItem', (req, res) => {
    const todoReqItem = req.body;
    console.log("Adding data", todoReqItem);
    todoRepo.create(todoReqItem).then(() => {return res});
  });

//Update one row
app.put('/todoItem/:id', (req, res) => {
    const { id } = req.params;
    const todoReqItem = req.body;
    console.log("Updating", todoReqItem);
    todoRepo.update(todoReqItem).then(() => {return res}); 
  });

//delete multiple rows
app.delete('/todoItem', (req, res) => {
    console.log('Clear all completed');
    const deleteArray = req.body.map((deleteItem)=> 
        todoRepo.delete(deleteItem.id).then(() => {return res})   
    );
  }); 

//delete one row
app.delete('/todoItem/:id', (req, res) => {
    const { id } = req.body;
    todoRepo.delete(id).then(() => {return res});
    console.log("Deleting", req.body )
  }); 

app.listen(8000, () => {
    console.log("Server running on port 8000");
});