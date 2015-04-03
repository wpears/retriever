var fs = require('fs');
var Readable = require('readable-stream/readable');

var noop = function(){};

function makeVRT(name, lat, lon, srs){
  return '<OGRVRTDataSource><OGRVRTLayer name="' + name + '">' +
  '<SrcDataSource>' + name + '.csv</SrcDataSource>' +
  '<GeometryType>wkbPoint</GeometryType>' +
  '<LayerSRS>' + srs + '</LayerSRS>' +
  '<GeometryField encoding="PointFromColumns" x="' + lon +'" y="' + lat + '"/>' +
  '</OGRVRTLayer>' +
  '</OGRVRTDataSource>'
}

function wrapCSV(name, lat, lon, srs){
  var vrt = makeVRT(name, lat, lon, srs||'WGS84'); 
  var reader = new Readable(); 
  reader._read = noop;
  reader.push(vrt);
  reader.push(null);
  return reader;
}

module.exports = wrapCSV;
