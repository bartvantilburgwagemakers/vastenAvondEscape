// var PouchDB = require('pouchdb-browser');
var db = new PouchDB('vastenAvondApp');

db.createIndex({
    index: {
      fields: ['Location_long', 'Location_lat']
    }
  }).then(function (result) {
    // handle result
  }).catch(function (err) {
    console.log(err);
  });

var remoteCouch = false;

export function add(entity) {
    
    return db.put(entity, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a todo!');
            return true;
        }
        console.log(`Error posted a todo ${err}`);
        return false;
    });
}

export function GetByLoc(long, lat) {
    // var doc = db.get("2019-11-09T18:36:13.877Z").then(function(doc) {
    //     console.log(doc);
    // });
    console.log( "GetByLoc "+long +"," +lat)
    db.find({
        selector: {Location_long: long , Location_lat: lat },
      }).then(function (result) {
          console.log(result);
        var element = document.getElementById("question");
        element.innerHTML = result.docs[0].Vraag;

       }).catch(function (err) {
        console.log(err);
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