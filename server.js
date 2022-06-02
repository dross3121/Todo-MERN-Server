const express = require('express');
const app = express();
const cors = require('cors')
const Todo = require('./models/todo')
const path = require('path');

// testing route
app.set('port', process.env.PORT || 3001)

app.listen(app.get('port'), ()=>{console.log(`"listening on ${app.get('port')}"`)
})
///////////////


// middelware
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cors())
//////////


// create todo route
app.post('/todos', (req,res)=>{
    Todo.create(req.body)
    .then((createdTodo)=>{
        res.json(createdTodo)
    })  
    .catch((err)=>{
        res.send(err)
    }) 
})
// get all todos route
app.get('/todos', (req, res)=>{
    Todo.find({})
    .then((todos)=>{
        res.json(todos)
    })
    .catch((err)=>{
        res.send(err)
    })
})
// find one todo by unique id
app.get('/todos/:id', (req,res)=>{
    Todo.findById({_id : req.params.id})
    .then((todo)=>{
        res.json(todo)
    })
    .catch((err)=>{
        res.send(err)
    })
})
// edit an existing todo
app.put('/todos/:id/edit', (req, res)=>{
    Todo.findByIdAndUpdate(
        req.params.id, 
        {
            title: req.body.title,
            complete : req.body.complete
        }
    )
    .then((todos)=>{
        res.send(todos)
    })
    .catch((err)=>{
        res.send(err)
    })
})

// delete todo by unique id
app.delete('/todos/:id', (req,res)=>{
    Todo.findByIdAndDelete({_id : req.params.id})
    .then((deletedTodo)=>{
        res.json(deletedTodo)
    })
    .catch((err)=>{
        res.send(err)
    })
})
