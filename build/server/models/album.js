// Generated by CoffeeScript 1.8.0
var Album, cozydb, _;

cozydb = require('cozydb');

_ = require('lodash');

module.exports = Album = cozydb.getModel('Album', {
  id: String,
  title: String,
  description: String,
  date: Date,
  orientation: Number,
  coverPicture: String,
  clearance: function(x) {
    return x;
  },
  folderid: String
});

Album.beforeSave = function(data, callback) {
  if (data.title != null) {
    data.title = data.title.replace(/<br>/g, "").replace(/<div>/g, "").replace(/<\/div>/g, "");
  }
  data.date = new Date();
  return callback();
};

Album.createIfNotExist = function(album, callback) {
  return Album.request('byTitle', {
    key: album.title
  }, function(err, albums) {
    var exist;
    exist = _.find(albums, function(fetchedAlbum) {
      return album.description === fetchedAlbum.description;
    });
    if (exist) {
      return callback(null, exist);
    } else {
      return Album.create(album, callback);
    }
  });
};
