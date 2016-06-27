/// Require Observable & GeoLocation

var Observable = require("FuseJS/Observable");
var GeoLocation = require("FuseJS/GeoLocation");

var StreetNumber = Observable("");
var Street = Observable("");
var City = Observable("");
var State = Observable("");
var ZipCode = Observable("");
var Country = Observable("");



/// Get Lat and Long from GPS

var lat = Observable("");
lat.addSubscriber(function(){});

var long = Observable("");
long.addSubscriber(function(){});


function findMe() {
lat.value = JSON.stringify(GeoLocation.location.latitude);
long.value = JSON.stringify(GeoLocation.location.longitude);
getAddress();
};



/// Translate GPS to Text using Google Maps API

var link1 = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
var link2 = ",";
var link3 = "&sensor=true";

function getAddress(){


var fullLink = Observable(link1 + lat.value + link2 + long.value + link3);
fullLink.addSubscriber(function(){});
fetch(fullLink.value)
  .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }).then(function(response) {

      StreetNumber.value = JSON.stringify(response.results[0].address_components[0].long_name);
      Street.value = JSON.stringify(response.results[0].address_components[1].long_name);
      City.value = JSON.stringify(response.results[0].address_components[3].long_name);
      State.value = JSON.stringify(response.results[0].address_components[6].long_name);
      ZipCode.value = JSON.stringify(response.results[0].address_components[8].long_name);
      Country.value = JSON.stringify(response.results[0].address_components[7].long_name);

    }).catch(function(error) {
        console.log("Fetch Failed");
    });
};



/// Module Exports

module.exports = {
  findMe : findMe,
  StreetNumber : StreetNumber,
  Street : Street,
  City : City,
  State: State,
  ZipCode: ZipCode,
  Country: Country
}