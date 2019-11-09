import * as DataRepo from "../src/DataBaseRepo.js";
import * as LocationService from "../src/LocationService.js";
import * as Vraag from "../src/Vraag.js"

export function GetNextQuestion() {
    var loc = LocationService.GetCurrentLocation();
    loc.then(function (result) {
        var latitude = result[0];
        var longitude = result[1];
        // DataRepo.GetByLoc(latitude, longitude);
        DataRepo.GetByLoc(51.49675729999999,4.313648099999999);
    })
    AddNewQuestion();
  
}

function AddNewQuestion(){
    var vraag = Vraag.NewVraag("1", 51.49675729999999, 4.313648099999999, "wat is de snelheid van een zwaluw " );
    DataRepo.add(vraag);
}
