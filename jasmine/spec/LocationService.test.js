import * as LocationService from "../lib/LocationService.js"


test("GetCurrentLocation", () =>{
    LocationService.GetCurrentLocation().then( data => {
        expect(data.latitude).not.toBeUndefined();
        expect(data.longitude).not.toBeUndefined();
    });
    expect(LocationService.latitude).not.toBeUndefined();
    expect(LocationService.longitude).not.toBeUndefined();
});