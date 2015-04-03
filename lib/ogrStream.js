var child = require('duplex-child-process');

module.exports = function(){

  return child.spawn('ogr2ogr',
    ['-f', 'GeoJson', '-t_srs', 'WGS84', '/vsistdout/', '/vsistdin/']
  );
};
