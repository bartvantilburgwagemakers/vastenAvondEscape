// var PouchDB = require('pouchdb-browser');
var db = new PouchDB('vastenAvondApp');
var remoteCouch = false;

export function addTodo(text) {
    var todo = {
        _id: new Date().toISOString(),
        title: text,
        completed: false
    };
    return db.put(todo, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a todo!');
            return true;
        }
        console.log(`Error posted a todo ${err}`);
        return false;
    });
}

export function showTodos() {
    db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
        redrawTodosUI(doc.rows);
    });
}

export function GetByLoc() {
    var doc = db.get("2019-11-09T18:36:13.877Z").then(function(doc) {
        console.log(doc);
    });

}

function checkboxChanged(todo, event) {
    todo.completed = event.target.checked;
    db.put(todo);
}

function deleteButtonPressed(todo) {
    db.remove(todo);
}

function test() {
    return 1;
}