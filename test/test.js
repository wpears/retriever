var wrap = require('../lib/wrapCSV.js');

wrap('test/data/t.csv','LAT','LONG','NAD83')
  .pipe(process.stdout);
