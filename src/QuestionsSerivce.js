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
    });
    AddNewQuestion();
}

function AddNewQuestion(){
    // var vraag = Vraag.NewVraag("0", 51.4882363 , 4.3190943, "wat is de snelheid van een zwaluw " );
    DataRepo.add(vraag);
    var vraag1 = Vraag.NewVraag("1", "Onlosmakelijk aan de draak verbonden: sint <br/> <br/> Nicolaas =1 "+
    "<br/> Antonius= 2  <br/>Petrus = 3 <br/> Joris= 4 <br/> Jakobus = 5 <br/>  Walrik = 6 <br/> Maarten=7 <br/> Anna=8",  11
    )
        
}
