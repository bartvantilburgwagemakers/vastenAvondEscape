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
        window.GetByLoc = DataRepo.GetByLoc;
    });
    AddNewQuestion();
}

function AddNewQuestion() {
    // var vraag = Vraag.NewVraag("0", 51.4882363 , 4.3190943, "wat is de snelheid van een zwaluw " );
    // DataRepo.add(vraag);
    var vraag1 = Vraag.NewVraag("1", "Onlosmakelijk aan de draak verbonden: sint <br/> <br/> Nicolaas= 1 " +
        "<br/> Antonius= 2  <br/>Petrus= 3 <br/> Joris= 4 <br/> Jakobus= 5 <br/>  Walrik= 6 <br/> Maarten= 7 <br/> Anna= 8",  "11", "het zijn er 2+"
    );
    DataRepo.add(vraag1);

    var vraag2 = Vraag.NewVraag("2", "Wat is de laatste zin en officiële tittel die bij dit beeld hoort?", "Kek naar oe eige", "", "../Assets/opdracht2.jpg");
    DataRepo.add(vraag2);

    var vraag3 = Vraag.NewVraagLatLong("3", "51.49255506", "4.2877107", "Ik hang boven het toilet", "de teerkastje", "Je bevond je bij de saeck.")
    DataRepo.add(vraag3);

    var vraag4 = Vraag.NewVraagLatLong("4", "51.49461571" ,"4.28639539", "waar ben je", "draak", "draak")
    DataRepo.add(vraag4);

    var vraag5 = Vraag.NewVraagLatLong("5", "51.495688","4.28336021", "waar ben je", "Zwijnshoofd", "Zwijnshoofd")
    DataRepo.add(vraag5);

    var vraag6 = Vraag.NewVraagLatLong("6", "51.49255506","4.2877107", "waar ben je", "De saeck", "De saeck")
    DataRepo.add(vraag6);

    var Stoellemat = Vraag.NewVraagLatLong("7", "51.49471892","4.28190966", "waar ben je", "Stoellemat", "Stoellemat")
    DataRepo.add(Stoellemat);


    console.log("vargen toegevoegd");
}

export function SetCurrentQuestion(question) {
    window.CurrentQuestion = question;
    var vraagDiv = document.getElementById("question");
    vraagDiv.innerHTML = question.Vraag;

    var img = document.getElementById("image");
    if (question.Media_uri) {
        img.hidden = false;
        img.src = question.Media_uri;
    } else {
        img.hidden = true;
    }

    var hint = document.getElementById("hint");
    hint.innerText = question.Hint;

    var answerTextBtn = document.getElementById("answerTextBtn");
    answerTextBtn.onclick =function() {
        var answerText = document.getElementById("answerText");
        if (answerText.value.trim() == question.Antwoord) {
            alert("good zo");
            DataRepo.HasAnswered(window.CurrentQuestion);
            GetNextQuestion();
        } else {
            console.log("gewesnt"+question.Antwoord );
            console.log("given"+answerText.value.trim());
            alert("probeer nog eens");
        }
    };
}