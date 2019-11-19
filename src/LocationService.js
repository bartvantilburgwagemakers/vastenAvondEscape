import * as QuestionsService from "../src/QuestionsSerivce.js";
export let latitude, longitude;

export async function GetCurrentLocation() {
    if (navigator.geolocation) {
        return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(function(position) {
                resolve([position.coords.latitude, position.coords.longitude]);
                setPosition(position);
                return position.coords;
            });
        });
    } else {
        var locDiv = document.getElementById("loc");
        locDiv.innerText = " Location (gps) not supported";
    }
}
export function GetShortLatitude(lat) {
    return lat.toString().substring(0, 7);
}

export function GetShortLongitude(long) {
    return long.toString().substring(0, 6);
}

function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log("latitude " + latitude + " en longitude " + longitude)
    var locDiv = document.getElementById("loc");
    locDiv.innerText = latitude + " : " + longitude + "position.coords.accuracy" + position.coords.accuracy;
}

export function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

const watcher = navigator.geolocation.watchPosition(displayLocationInfo);

export function StopWatching() {
    navigator.geolocation.clearWatch(watcher);
};

export function StartWatching() {
    navigator.geolocation.clearWatch(watcher);
    watcher = navigator.geolocation.watchPosition(displayLocationInfo);
}


function displayLocationInfo(position) {
    const lng = GetShortLongitude(position.coords.longitude);
    const lat = GetShortLatitude(position.coords.latitude);
    var long = GetShortLongitude("4.3139517");
    var late = GetShortLatitude("51.4966615");
    // console.log(`longitude: ${ lng } ${long} | latitude: ${ lat } ${late}`);
    if (lng === long && lat === late) {
        var locDiv = document.getElementById("loc");
        locDiv.innerText = "Welkom Thuis lieve schat ";
        var vraagDiv = document.getElementById("question");
        vraagDiv.innerHTML = "Ik hou van je ";
        StopWatching();
    } else {
        GetNextQuestion();
        StopWatching();
    }
}