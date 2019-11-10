import * as LocationService from "../src/LocationService.js";

export function NewVraag(id, lat, long, vraag, hint, media_uri ){

    var shortLat= LocationService.GetShortLatitude(lat);
    var shortLong= LocationService.GetShortLongitude(long);
    console.log("new  vraag shortLat "+shortLat+ " shortLong "+shortLong )
    return {
        _id: id,
        Location_long: shortLong,
        Location_lat: shortLat,
        Vraag: vraag,
        hint: hint,
        media_uri :media_uri,
        IsJuistBeandword:false
    }
}
