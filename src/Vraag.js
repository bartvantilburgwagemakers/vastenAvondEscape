import * as LocationService from "../src/LocationService.js";

export function NewVraag(id, lat, long, vraag, antwoord, hint){

    var shortLat= LocationService.GetShortLatitude(lat);
    var shortLong= LocationService.GetShortLongitude(long);
    console.log("new  vraag shortLat "+shortLat+ " shortLong "+shortLong )
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
export function NewVraag(id, lat, long, vraag, antwoord ,hint, media_uri ){
    var vraag = NewVraag(id, lat, long, vraag, antwoord, hint);
    vraag.media_uri =media_uri;
    return vraag;
}

