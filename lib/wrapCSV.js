var fs = require('fs');
var Readable = require('readable-stream/readable');

var noop = function(){};

function makeVRT(name, srs, lat, lon){
  return '<OGRVRTDataSource><OGRVRTLayer name="' + name + '">' +
  '<SrcDataSource>' + name + '.csv</SrcDataSource>' +
  '<GeometryType>wkbPoint</GeometryType>' +
  '<LayerSRS>' + srs + '</LayerSRS>' +
  '<GeometryField encoding="PointFromColumns" x="' + lon +'" y="' + lat + '"/>' +
  '</OGRVRTLayer>' +
  '</OGRVRTDataSource>'
}

function wrapCSV(program, cb){
  var vrt = makeVRT(program.name, program.srs||'WGS84', program.lat, program.lon); 
  var reader = new Readable(); 
  reader._read = noop;
  reader.push(vrt);
  reader.push(null);
  return reader;

}
module.exports = wrapCSV;
