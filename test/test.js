var wrap = require('../lib/wrapCSV.js');
var ogrStream= require('../lib/ogrStream.js');

wrap('test/data/t.csv','LAT','LONG','NAD83')
  .pipe(ogrStream())
  .pipe(process.stdout);
