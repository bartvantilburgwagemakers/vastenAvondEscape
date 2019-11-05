import * as DataRepo from "../lib/DataBaseRepo.js";
import * as LocationService from "../lib/LocationService.js";

jest.mock('LocationService')

export function GetNextQuestion(){
    LocationService.GetCurrentLocation()
}