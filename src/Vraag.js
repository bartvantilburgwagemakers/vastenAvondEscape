
export function NewVraag(id, long, lat, vraag, hint, media_uri ){

    return {
        _id: id,
        Location_long: long,
        Location_lat: lat,
        Vraag: vraag,
        hint: hint,
        media_uri :media_uri,
        IsJuistBeandword:false
    }
}