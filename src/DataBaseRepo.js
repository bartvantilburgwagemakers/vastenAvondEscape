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
window.db = db;
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
    
    console.log( "GetByLoc "+long +"," +lat)
    db.find({
        selector: {Location_long: long , Location_lat: lat },
      }).then(function (result) {
          console.log(result);
        if(result.docs.length !=0){
          var element = document.getElementById("question");
          element.innerHTML = result.docs[0].Vraag;
        }else{
          console.log("kan niet vinden ");
          
        }

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
