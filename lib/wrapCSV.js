var fs = require('fs');
var path = require('path');
var Readable = require('readable-stream/readable');

var noop = function(){};

function makeVRT(fullPath, lat, lon, srs){
  var ext = path.extname(fullPath);
  var name = path.basename(fullPath, ext);
  var fullBasename = path.join(path.dirname(fullPath), name); 
  return '<OGRVRTDataSource><OGRVRTLayer name="' + name + '">' +
  '<SrcDataSource>' + fullBasename + '.csv</SrcDataSource>' +
  '<GeometryType>wkbPoint</GeometryType>' +
  '<LayerSRS>' + srs + '</LayerSRS>' +
  '<GeometryField encoding="PointFromColumns" x="' + lon +'" y="' + lat + '"/>' +
  '</OGRVRTLayer>' +
  '</OGRVRTDataSource>'
}

function wrapCSV(fullPath, lat, lon, srs){
  var vrt = makeVRT(fullPath, lat, lon, srs||'WGS84'); 
  var reader = new Readable(); 
  reader._read = noop;
  reader.push(vrt);
  reader.push(null);
  return reader;
}

module.exports = wrapCSV;
