var fs = require('fs');
var crypto = require('crypto');
var cache = {};

module.exports = function (path) {
  if (cache[path]) {
    return cache[path];
  }

  var content;
  try {
    content = fs.readFileSync(path);
  } catch (err) {
    throw new Error(path + ' not found');
  }

  if (!content) return;

  var hash = crypto
    .createHash('md5')
    .update(content)
    .digest('hex')
    .slice(0, 12); // Truncate to first 12 chars

  cache[path] = hash;

  return hash;
};
