import * as LocationService from "../lib/LocationService.js"


test("GetCurrentLocation", () =>{
    LocationService.GetCurrentLocation().then( data => {
        expect(dat.latitude).not.toBeUndefined();
        expect(dat.longitude).not.toBeUndefined();
    });
    expect(LocationService.latitude).not.toBeUndefined();
    expect(LocationService.longitude).not.toBeUndefined();
});