var db = new PouchDB('vastenAvondApp');
var remoteCouch = false;

function addTodo(text) {
    var todo = {
        _id: new Date().toISOString(),
        title: text,
        completed: false
    };
    db.put(todo, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a todo!');
        }
    });

}

function showTodos() {
    db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
        redrawTodosUI(doc.rows);
    });
}

function checkboxChanged(todo, event) {
    todo.completed = event.target.checked;
    db.put(todo);
}

function deleteButtonPressed(todo) {
    db.remove(todo);
}