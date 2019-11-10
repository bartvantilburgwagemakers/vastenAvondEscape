import * as QuestionsSerivce from "../src/QuestionsSerivce.js";
import { longitude } from "./LocationService.js";

// var PouchDB = require('pouchdb-browser');
var db = new PouchDB('vastenAvondApp');

db.createIndex({
    index: {
        fields: ['Location_long', 'Location_lat', 'IsJuistBeandwoord']
    }
}).then(function(result) {
    // handle result
}).catch(function(err) {
    console.log(err);
});
db.createIndex({
    index: {
        fields: ['IsJuistBeandwoord']
    }
}).then(function(result) {
    // handle result
}).catch(function(err) {
    console.log(err);
});
var remoteCouch = false;

export function add(entity) {

    return db.put(entity, function callback(err, result) {
        if (!err) {
            console.log('Successfully posted a entity!');
            return true;
        }
        console.log(`Error posted a entity ${err}`);
        return false;
    });
}

export function GetByLoc(long, lat) {

    console.log("GetByLoc " + long + "," + lat)
    db.find({
        selector: { Location_long: long, Location_lat: lat, IsJuistBeandwoord: false },
    }).then(function(result) {
        console.log(result);
        if (result.docs.length != 0) {
            QuestionsSerivce.SetCurrentQuestion(result.docs[0]);
            console.log("set question by loc" + result.docs[0]._id);
        } else {
            console.log("kan niet vinden ");
            GetNextQuestion();
        }

    }).catch(function(err) {
        console.log(err);
    });
}

function GetNextQuestion() {
    db.find({
        selector: { IsJuistBeandwoord: false },
        sort: ['_id'],
        limit: 1
    }).then(function(result) {
        if (result.docs.length != 0) {
            QuestionsSerivce.SetCurrentQuestion(result.docs[0]);
            console.log("set question by next" + result.docs[0]._id);
        }
    }).catch(function(err) {
        console.log(err);
    });
}

export function SetQuestionsIfNeeded() {
    var doc = db.get("1").then(function(doc) {}).catch(function(err) {
        if (err.status === 404) {
            console.log("ok dan moeten we maar eens vragen gaan ophalen");
        }
    });
}

export function HasAnswered(vraag) {
    vraag.IsJuistBeandwoord = true;
    db.put(vraag);
}

function deleteButtonPressed(todo) {
    db.remove(todo);
}