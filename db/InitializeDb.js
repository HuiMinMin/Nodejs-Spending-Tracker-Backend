const Promise = require('bluebird')
const AppDAO = require('./dao')
const TodoRepository = require('./TodoRepository')

function InitializeDb() {
  const dao = new AppDAO('../database.sqlite3')
  const todoRepo = new TodoRepository(dao)

  todoRepo.createTable()
    .then(() => {
      const todoItems = [
        {id:'1', description:'Post instead of local storage to backend', complete: true}, 
        {id:'2', description:'Load past data on page load', complete: true},
        {id:'3', description:'When completed, strikeout word (font-type?)', complete: true},
        {id:'4', description:'Beautify page', complete: true},
        {id:'5', description:'Update existing item(with checkbox status)', complete: true},
        {id:'6', description:'sql lite with some queries', complete: false},
        {id:'7', description:'edit with original description in', complete: true},
        {id:'8', description:'filter task with some buttons', complete: false},
        {id:'9', description:'Use MUI to signify completed task more nicely? ', complete: false},
        {id:'10', description:'Clear Completed todo not persisting in backend', complete: true},
        {id:'11', description:'Make api restful(stateless)', complete: true},
        {id:'12', description:'api documentation with swagger', complete: false},
        {id:'13', description:'git backend', complete: true},
        {id:'14', description:'restructure code into view and controllers', complete: true},
        {id:'15', description:'nav bar to load a logo', complete: false},
        {id:'16', description:'light/dark theme', complete: true},
        {id:'17', description:'context', complete: true}
    ]
      return Promise.all(todoItems.map((todoItem) => {
        // const { id, description, complete } = todoItem
        return todoRepo.create(todoItem)
      }))
    })
    .then(() => todoRepo.getAll())
    .then((todoItems) => {
      console.log(`\nRetreived todo list from database`)
      return new Promise((resolve, reject) => {
        todoItems.forEach((todoItem) => {
            console.log(`todoItem id = ${todoItem.id}`)
            console.log(`todoItem description = ${todoItem.description}`)
            console.log(`todoItem complete = ${todoItem.complete}`)
            })
        })
        resolve('success')
      })
    .catch((err) => {
      console.log('Error: ')
      console.log(JSON.stringify(err))
    })
}

InitializeDb()