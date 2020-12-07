const assert = require("assert");
const _ = require("lodash");
const moment = require("moment");
var rawEvents = require("./raw_events.json");

describe("Events Tests", function () {
    // Prepare dates
    _.forEach(rawEvents, function (event) {
        event.date = moment(event.time).format("YYYY-MM-DD");
    });

    describe("number of events", function () {
        it("output events count", function () {
            var groupedByDate = _.groupBy(rawEvents, 'date');
            var prevValue = -1;
            _.forEach(_.keys(groupedByDate), function (k) {
                console.log(`Number of events on ${k} ==> ${groupedByDate[k].length}`)
                if(prevValue !== -1) {
                    if(!((prevValue * 0.8) <= groupedByDate[k].length && groupedByDate[k].length <= (prevValue * 1.2))) {
                        console.log(`Number of events for ${k} varies by more than 20% from previous day's data. Previous day's value => ${prevValue}. Current value => ${groupedByDate[k].length}`);
                    }
                }
                prevValue = groupedByDate[k].length;
            });
        });
    });

    describe("null values", function () {
        it("null user names", function () {
            var userNulls = _.filter(rawEvents, function (event) {
                return event.username == null || event.username == "null" || !event.username;
            });

            _.forEach(userNulls, function (event) {
                console.log(`User name is null for ID : ${event._id}, Hook: ${event.hookname}, Hook Id : ${event.hookid}`);
            });

            console.log("Numer of events that have no user id => ", userNulls.length);
        });
    });
});
