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
        locDiv.innerText = " Location (gps) not suported";
    }
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