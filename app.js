var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todoItems = [
    {id:1, description:'Post instead of local storage to backend', complete: true}, 
    {id:2, description:'Load past data on page load', complete: true},
    {id:3, description:'When completed, strikeout word (font-type?)', complete: true},
    {id:5, description:'Beautify page', complete: false},
    {id:6, description:'Update existing item(with checkbox status)', complete: false},
    {id:7, description:'Shift item sequence', complete: false},
    {id:8, description:'sql lite', complete: false},
    {id:8, description:'edit with original description in', complete: true},
    {id:8, description:'filter task with some buttons', complete: false},
    {id:8, description:'Use MUI to signify completed task more nicely? ', complete: false},
    {id:8, description:'Clear Completed todo not persisting in backend', complete: false},
    {id:8, description:'Make api restful(stateless)', complete: false},
    {id:8, description:'api documentation with swagger', complete: false},
    {id:8, description:'git backend', complete: false},
    {id:8, description:'turn into a spending tracker', complete: false},
    {id:8, description:'restructure code into view and controllers', complete: false},
    {id:8, description:'nav bar to load a logo', complete: false}
];

app.get("/getTodoItems", (req, res) => {
    res.json(todoItems);
    return res;
});

app.post('/postTodoItem', (req, res) => {
    const todoReqItem = req.body.newTodoItem;
    console.log("Adding data", todoReqItem);
    todoItems.push(todoReqItem);
    return res;
  });
   
app.put('/updateTodoItem', (req, res) => {
    const todoReqItem = req.body.newTodoItem;
    console.log("Updating", todoReqItem);
    updatingTodoItem = todoItems.filter((item) => item.id ===  todoReqItem.id)
    updatingTodoItem[0].description = todoReqItem.description
    updatingTodoItem[0].complete = todoReqItem.complete
    console.log(todoItems.filter((item) => item.id ===  todoReqItem.id))
    return res;
  });
   
app.delete('/deleteTodoItems', (req, res) => {
    const todoReqItem = req.body;
    todoItems = todoItems.filter((item) => item.id !==  todoReqItem.id)
    return res;
  }); 

app.listen(8000, () => {
    console.log("Server running on port 8000");
});