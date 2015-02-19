var url = require('url');
var path = require('path');
var getFileHash = require('../get-file-hash');


function hashify(content) {
	// Find all "/v4/templates/*.html"
	var regex = /['"]\/v4\/templates\/.+?\.html['"]/gi;
	var match = regex.exec(content);

	while (match !== null) {
		var originalMatch = match[0];
		var normalizedUri = originalMatch.replace(/['"]/g, '');
		var templatePath = path.join(process.cwd(), 'public', normalizedUri.substr(4));
		var hash = getFileHash(templatePath);

		// Build replacement uri
		var newUri = url.format({
			pathname: normalizedUri,
			query: {
				v: hash
			}
		});
		var replacement = originalMatch.replace(normalizedUri, newUri);

		// Find and replace
		content = content.replace(originalMatch, replacement);

		// Find next match
		match = regex.exec(content);
	}

	return content;
};

module.exports = function (grunt) {
	grunt.registerMultiTask(
		'hashifyTemplates',
		'Append cache-busting hashes to angular template urls',
		function () {
			var options = this.options;

			// Iterate over all src-dest file pairs.
			this.files.forEach(function (f) {
				f.src.filter(function (filepath) {
					// Warn on and remove invalid source files (if nonull was set).
					if (!grunt.file.exists(filepath)) {
						grunt.log.warn('Source file "' + filepath + '" not found.');
						return false;
					} else {
						return true;
					}
				}).map(function (filepath) {
					var content = grunt.file.read(filepath);
					var hashified = hashify(content);

					grunt.file.write(filepath, hashified);
					grunt.log.writeln('✔ '.cyan + 'File', filepath.cyan, 'hashified.');
				});
			});
		}
	);
}