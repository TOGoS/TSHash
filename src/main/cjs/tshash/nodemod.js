var index = require('./index');

index.SHA1 = require('./SHA1').default;
index.CRC32 = require('./CRC32').default;
index.uuids = require('./uuids');

module.exports = index;
