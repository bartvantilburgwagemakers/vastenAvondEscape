import * as DataRepo from "../src/DataBaseRepo.js";
import * as LocationService from "../src/LocationService.js";
import * as Vraag from "../src/Vraag.js"

export function GetNextQuestion() {
    var loc = LocationService.GetCurrentLocation();
    loc.then(function (result) {
        var latitude = result[0];
        var longitude = result[1];
        var shortLat= LocationService.GetShortLatitude(latitude);
        var shortLong= LocationService.GetShortLongitude(longitude);
        DataRepo.GetByLoc(shortLong, shortLat);
    })
    AddNewQuestion();
  
}

function AddNewQuestion(){
    var vraag = Vraag.NewVraag("1", 51.4882363 , 4.3190943, "wat is de snelheid van een zwaluw " );
    DataRepo.add(vraag);
    
}
