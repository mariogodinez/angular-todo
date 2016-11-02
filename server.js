var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/angular-todo');

var Todo = mongoose.model('Todo', {
	text: String
})



app.get('/api/todos', function(req, res){
	Todo.find(function(err, todos){
		if(err){
			res.send(err)
		}
		res.send(todos)
	})
})


app.post('/api/todos', function(req, res) {  
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo){
        if(err) {
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });
    });
});


// DELETE un TODO específico y devuelve todos tras borrarlo.
app.delete('/api/todos/:todo', function(req, res) {  
    Todo.remove({
        _id: req.params.todo
    }, function(err, todo) {
        if(err){
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if(err){
                res.send(err);
            }
            res.json(todos);
        });

    })
});

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
app.get('*', function(req, res) {  
    res.sendfile('./index.html');                
});





app.listen(8080,function(){
	console.log('server listening at por 8080')
})



