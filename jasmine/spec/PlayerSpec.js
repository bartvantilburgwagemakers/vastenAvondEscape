// import * as locationService from '../../src/LocationService';
function ArePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
};

describe("Player", function() {
    var player;
    var song;

    beforeEach(function() {
        player = new Player();
        song = new Song();
    });

    it("should be able to play a Song", function() {
        player.play(song);
        expect(player.currentlyPlayingSong).toEqual(song);

        //demonstrates use of custom matcher
        expect(player).toBePlaying(song);
    });

    describe("when song has been paused", function() {
        beforeEach(function() {
            player.play(song);
            player.pause();
        });

        it("should indicate that the song is currently paused", function() {
            expect(player.isPlaying).toBeFalsy();

            // demonstrates use of 'not' with a custom matcher
            expect(player).not.toBePlaying(song);
        });

        it("should be possible to resume", function() {
            player.resume();
            expect(player.isPlaying).toBeTruthy();
            expect(player.currentlyPlayingSong).toEqual(song);
        });
    });

    // demonstrates use of spies to intercept and test method calls
    it("tells the current song if the user has made it a favorite", function() {
        spyOn(song, 'persistFavoriteStatus');

        player.play(song);
        player.makeFavorite();

        expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
    });

    //demonstrates use of expected exceptions
    describe("#resume", function() {
        it("should throw an exception if song is already playing", function() {
            player.play(song);

            expect(function() {
                player.resume();
            }).toThrowError("song is already playing");
        });
    });

    describe("test location", function() {
        it("should load the location service ", function() {
            var checkPoint = { lng: 4.3139517, lat: 51.4966615 };
            var centerPoint = { lng: 4.3139516, lat: 51.4966615 };
            var result = ArePointsNear(checkPoint, centerPoint, 0);
            expect(result).toBeFalsy();
        });
        it("should load the location service ", function() {
            var checkPoint = { lng: 4.3139517, lat: 51.4966615 };
            var centerPoint = { lng: 4.3139516, lat: 51.4966615 };
            var result = ArePointsNear(checkPoint, centerPoint, 0.1);
            expect(result).toBeTruthy();
        });
        it("draak0.01", function() {
            var checkPoint = { lng: 4.2863401, lat: 51.4946284 };
            var centerPoint = { lat: 51.49461571, lng: 4.28639539 };
            var result = ArePointsNear(checkPoint, centerPoint, 0.01);
            expect(result).toBeTruthy();
        });
        it("draak0.02", function() {
            var checkPoint = { lng: 4.2863401, lat: 51.4946284 };
            var centerPoint = { lat: 51.49461571, lng: 4.28639539 };
            var result = ArePointsNear(checkPoint, centerPoint, 0.02);
            expect(result).toBeTruthy();
        });
        it("draak0.0011", function() {
            var checkPoint = { lng: 4.2863401, lat: 51.4946284 };
            var centerPoint = { lat: 51.49461571, lng: 4.28639539 };
            var result = ArePointsNear(checkPoint, centerPoint, 0.0011);
            expect(result).toBeTruthy();
        });
        it("draak0.0015", function() {
            var checkPoint = { lng: 4.2863401, lat: 51.4946284 };
            var centerPoint = { lat: 51.49461571, lng: 4.28639539 };
            var result = ArePointsNear(checkPoint, centerPoint, 0.0015);
            expect(result).toBeTruthy();
        });
    });
});