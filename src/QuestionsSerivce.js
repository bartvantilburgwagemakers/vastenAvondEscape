import * as DataRepo from "../src/DataBaseRepo.js";
import * as LocationService from "../src/LocationService.js";
import * as Vraag from "../src/Vraag.js"

export function GetNextQuestion() {
    var loc = LocationService.GetCurrentLocation();
    loc.then(function(result) {
        var latitude = result[0];
        var longitude = result[1];
        var shortLat = LocationService.GetShortLatitude(latitude);
        var shortLong = LocationService.GetShortLongitude(longitude);
        DataRepo.GetByLoc(shortLong, shortLat);
    });
    AddNewQuestion();
}

function AddNewQuestion() {
    // var vraag = Vraag.NewVraag("0", 51.4882363 , 4.3190943, "wat is de snelheid van een zwaluw " );
    // DataRepo.add(vraag);
    var vraag1 = Vraag.NewVraag("1", "Onlosmakelijk aan de draak verbonden: sint <br/> <br/> Nicolaas= 1 " +
        "<br/> Antonius= 2  <br/>Petrus= 3 <br/> Joris= 4 <br/> Jakobus= 5 <br/>  Walrik= 6 <br/> Maarten= 7 <br/> Anna= 8", "het zijn er ", "11"
    );
    DataRepo.add(vraag1);
    var vraag2 = Vraag.NewVraag("2", "Wat is de laatste zin en officiële tittel die bij dit beeld hoort?", "Kek naar oe eige", "", "../Assets/opdracht2.jpg");
    DataRepo.add(vraag2);
    console.log("vargen toegevoegd");
}

export function SetCurrentQuestion(question) {
    window.CurrentQuestion = question;
    var vraagDiv = document.getElementById("question");
    vraagDiv.innerHTML = question.Vraag;

    var img = document.getElementById("image");
    if (question.media_uri) {
        img.hidden = false;
        img.src = question.media_uri;
    } else {
        img.hidden = true;
    }

    var answerTextBtn = document.getElementById("answerTextBtn");
    answerTextBtn.onclick(function() {
        var answerText = document.getElementById("answerText");
        if (answerText.trim() == question.Antwoord) {
            alert("good zo");
            GetNextQuestion();
        } else {
            alert("probeer nog eens");
        }
    });
}