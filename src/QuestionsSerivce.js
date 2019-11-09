import * as DataRepo from "../src/DataBaseRepo.js";
import * as LocationService from "../src/LocationService.js";

export function GetNextQuestion() {
    LocationService.GetCurrentLocation();
    DataRepo.addTodo("test werk dit");
    DataRepo.GetByLoc();
}