import * as DataRepo from "../src/DataBaseRepo.js";
import * as LocationService from "../src/LocationService.js";
import * as Vraag from "../src/Vraag.js"

var questions = [];

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
    DataRepo.DbInfo().then(function(DbInfo) {
        if (DbInfo > 2) { DbInfo = DbInfo - 2; } // door de indexe die ook mee komen
        if (DbInfo < questions.length) {
            AddNewQuestion();
        }
    });
}

function AddNewQuestion() {

    GetQuestions();
    var i;
    for (i = 0; i < questions.length; i++) {
        DataRepo.add(questions[i]);
    }

    console.log("vragen toegevoegd");
}

function GetQuestions() {
    var vraag6 = Vraag.NewVraagLocationAntword("1", "51.49255506", "4.2877107", "De saeck", "De saeck");
    questions.push(vraag6);
    
    var draakVraag1 = Vraag.NewVraag("6", "Onlosmakelijk aan de draak verbonden: sint <br/> <br/> Nicolaas= 1 " +
        "<br/> Antonius= 2  <br/>Petrus= 3 <br/> Joris= 4 <br/> Jakobus= 5 <br/>  Walrik= 6 <br/> Maarten= 7 <br/> Anna= 8", "11", "het zijn er 2+");
    questions.push(draakVraag1);
    var vraag2 = Vraag.NewVraag("2", "Wat is de laatste zin en officiële tittel die bij dit beeld hoort?", "Kek naar oe eige", "kijk in de spiegel", "../Assets/opdracht2.jpg");
    questions.push(vraag2);
    var vraag3 = Vraag.NewVraagLatLong("3", "51.49255506", "4.2877107", "Ik hang boven het toilet", "de teerkastje", "Je bevond je bij de saeck.");
    questions.push(vraag3);
    var vraag4 = Vraag.NewVraag("4", "Onder welke kemissie vallen de: prins, gròòtste boer,steketee en de nar?","protocol","O.J. punctuel verwijst er naar in zijn carnavalsnummer")
    questions.push(vraag4);
    var hetGeitje = Vraag.NewVraag("5", "51°29'50.5\"N 4°17'25.9\"E ", "de geit van mie d’n os", "we ere het ieder jaar");
    questions.push(hetGeitje);


    var vraag7 = Vraag.NewVraag("7", "", "tussen de schuifdeuren", "kaartjes, weekend vooraf","../Assets/opdracht7.png");
    questions.push(vraag7);
    var vraag8 = Vraag.NewVraag("8", "kaart, ei, verdwijnen, wier, koffiedik, verschijnen", "wana 1976" , "lied + jaar");
    questions.push(vraag8);

    var draak = Vraag.NewVraagLatLong("14", "51.49461571", "4.28639539", "waar ben je", "draak", "draak");
    questions.push(draak);
    var zwijnshoofd = Vraag.NewVraagLatLong("10", "51.495688", "4.28336021", "waar ben je", "Zwijnshoofd", "Zwijnshoofd");
    questions.push(zwijnshoofd);

   
    var GroenePaard = Vraag.NewVraagLatLong("9", "51.49420007", "4.28808471", "waar ben je", "Groene paard", "Groene paard");
    questions.push(GroenePaard);
    
    var motier = Vraag.NewVraagLatLong("11", "51.4959334", "4.2774286", "waar ben je", "motier", "motier");
    questions.push(motier);
    var dweilpak = Vraag.NewVraagLatLong("12", "51.49644713", "4.27688547", "waar ben je", "dweilpak", "dweilpak");
    questions.push(dweilpak);
    var provoost = Vraag.NewVraagLatLong("13", "51.49393937", "4.28543607", "waar ben je", "provoost", "provoost");
    questions.push(provoost);
    var Stoellemat = Vraag.NewVraagLatLong("15", "51.49471892", "4.28190966", "waar ben je", "Stoellemat", "Stoellemat");
    questions.push(Stoellemat);
    var OnderDePeperbus = Vraag.NewVraagLatLong("16", "51.4943376", "4.28743893", "waar ben je", "Onder de peperbus ", "Onder de peperbus ");
    questions.push(OnderDePeperbus);
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
    answerTextBtn.onclick = function() {
        var answerText = document.getElementById("answerText");
        if (answerText.value.trim() == question.Antwoord) {
            alert("good zo");
            DataRepo.HasAnswered(window.CurrentQuestion);
            GetNextQuestion();
            answerText.value="";
        } else {
            console.log("gewesnt" + question.Antwoord);
            console.log("given" + answerText.value.trim());
            alert("probeer nog eens");
        }
    };
}

GetQuestions();