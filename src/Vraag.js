import * as LocationService from "../src/LocationService.js";

export function NewVraagLatLong(id, lat, long, vraag, antwoord, hint) {

    var shortLat = LocationService.GetShortLatitude(lat);
    var shortLong = LocationService.GetShortLongitude(long);
    console.log("new  vraag shortLat " + shortLat + " shortLong " + shortLong)
    return {
        _id: id,
        Location_long: shortLong,
        Location_lat: shortLat,
        Vraag: vraag,
        Antwoord: antwoord,
        Hint: hint,
        IsJuistBeandwoord: false
    }
}
export function NewVraag(id, vraag, antwoord, hint, media_uri) {
    return {
        _id: id,
        Vraag: vraag,
        Antwoord: antwoord,
        Hint: hint,
        IsJuistBeandwoord: false,
        Media_uri: media_uri
    }
}