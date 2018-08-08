//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

//ICH code for popup template if needed----------
var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

// var onEachFeature = function(feature, layer) {
//   layer.bindPopup(ich.popup(feature.properties))
// };
var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

var data = require("./chinatownmap.geo.json");
var color = {
  "2012": "#67001f",
  "2013": "#ff3c6d",
  "2014": "#f46d43",
  "2015": "#fec018",
  "2016": "#053061",
  "2017": "#8073ac",
  "2018": "#2d004b"
}

var category = {
  "Non-profit housing developer": "4",
}

function geojsonMarkerOptions(feature) {
  console.log(feature.properties)

  return {
    radius: 7,
    // fillColor: getColor(feature.properties.type),
    fillColor: color[feature.properties.year] || "#f15a29",
    color: "#000000",
    weight: 0.25,
    weight: category[feature.properties.nonprofit] || "0",
    opacity: 0.7,
    fillOpacity: 0.7,  
  }
};


var geojson = L.geoJson(data, {
    pointToLayer: function (feature, lnglat) {
        return L.circleMarker(lnglat);
    },
    style: geojsonMarkerOptions,
    onEachFeature: onEachFeature
}).addTo(map);


var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

 map.scrollWheelZoom.disable();

 map.fitBounds(geojson.getBounds());
