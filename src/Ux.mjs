export function ShowHint(){
    var hintDiv = document.getElementById("hint");
    hintDiv.innerText = "Wel eerst ffekes wachten ";
    setTimeout(function() { hintDiv.innerText  =window.CurrentQuestion.Hint }, 60000 );
}