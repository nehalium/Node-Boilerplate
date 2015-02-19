var assets = require('./assets');

module.exports = function(grunt) {
	var banner = '/*! <%= pkg.company %>  <%= pkg.name %> - v<%= pkg.version %> - ' +
		'<%= grunt.template.today("yyyy-mm-dd") %> ' +
		'- Copyright <%= pkg.company %>, Inc. */\n\n';

	var jsFiles = {
		browser: [
			'src/js/**/*.js',
			'!src/js/external/*.js'
		],
		node: [
			'*.js',
			'app/**/*.js',
			'config/*.js',
			'lib/*.js'
		],
		test: ['spec/**/*.js']
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			// Shared options
			options : {
				undef: true
			},

			// Env-specific options
			browser: {
				options: {
					globals: {
						angular: true,
						_: true,
						FiftyOneLib: true
					},
					browser: true,
					jquery: true,
					es3: true
				},
				files: {
					src: jsFiles.browser
				}
			},
			node: {
				options: {
					node: true
				},
				files: {
					src: jsFiles.node
				}
			},
			test: {
				options: {
					phantom: true,
					globals: {
						// Angular
						angular: true,
						module: true,
						inject: true,

						// Jasmine
						jasmine: true,
						readFixtures: true,
						spyOn: true,
						beforeEach: true,
						afterEach: true,
						describe: true,
						it: true,
						expect: true,
						runs: true,
						waits: true,
						iit: true,
						ddescribe: true,
						xdescribe: true,
						xit: true,
						getTranslation: true,

						// Protractor
						browser: true,
						$: true,
						element: true,
						by: true,

						// Others
						_: true
					}
				},
				files: {
					src: jsFiles.test
				}
			}
		},

		// Set options in nodemon.json so that both the binary and Grunt has
		// access to it
		nodemon: {
			local: {
				script: 'server.js'
			}
		},

		env: {
			test: {
				NODE_ENV: 'TEST'
			},
			local: {
				NODE_ENV: 'LOCAL'
			}
		},

		jasmine_node: {
			extensions : 'js',
			specNameMatcher : 'spec',
			projectRoot : './spec/',
			requirejs : false,
			forceExit : true,
			jUnit: {
				report: true,
				savePath : './logs/',
				useDotNotation: true,
				consolidate: true
			}
		},

		ejs: {
			templates: {
				files: [{
					expand: true,
					cwd: 'app/views/templates',
					src: [ '**/*.ejs' ],
					dest: 'public/templates',
					ext: '.html'
				}]
			}
		},

		less: {
			production : {
				options : {
					compress: true,
					paths: 'src/bower_components/bootstrap/less'
				},
				files : {
					'public/css/build.css': 'src/less/styles.less'
				}
			}
		},

		// Annotate injected deps in Angular to enable mangling in uglify
		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			app: {
				files: {
					'public/js/app.js': assets.app
				}
			}
		},

		uglify : {
			options : {
				// @todo: turning off mangling until we figure out which di annotation
				// @is screwing it up
				mangle : false,

				report : 'min',
				compress : true,
				preserveComments : 'some',
				banner : banner
			},
			all: {
				files: {
					'public/js/vendor.js': assets.vendor,
					'public/js/app.js': 'public/js/app.js',
					'public/js/ie8.js': assets.ie8,
					'public/js/demo.js': assets.demo
				}
			}
		},

		hashifyTemplates : {
			files: 'public/js/app.js'
		},

		usebanner: {
			options: {
				banner: banner
			},
			files: {
				src: ['public/css/build.css']
			}
		},

		copy: {
			main: {
				files: [
					{expand: true, flatten: true, src: ['src/html/**'], dest: 'public/html/', filter: 'isFile'},
					{expand: true, flatten: true, src: ['src/json/*'], dest: 'public/json/', filter: 'isFile'},
					{expand: true, flatten: true, src: ['src/img/*'], dest: 'public/img/', filter: 'isFile'},
					{expand: true, flatten: true, src: ['src/w3c/*'], dest: 'public/w3c/', filter: 'isFile'}
				]
			}
		},

		hashifyUrls: {
			options: {
				baseDir: 'public'
			},
			files: {
				src: 'public/css/build.css'
			}
		},

		karma: {
			options: {
				configFile: 'config/karma.conf.js'
			},
			ci: {
				singleRun: true
			},
			// @todo: figure out why Grunt does nothing when background: true
			dev: {
				// background: true
			}
		},

		express: {
			test: {
				options: {
					script: 'server.js',
					node_env: 'TEST'
				}
			}
		},

		protractor: {
			// Runs with Chrome
			dev: {
				configFile: 'config/protractor-dev.conf.js'
			},
			// Runs with PhantomJS
			ci: {
				configFile: 'config/protractor-ci.conf.js'
			}
		},

		watch: {
			ejs: {
				files : 'app/views/templates/**/*.ejs',
				tasks : ['ejs']
			},
			less: {
				files : './src/less/**/*.less',
				tasks : ['less']
			},
			jshintBrowser: {
				files: jsFiles.browser,
				tasks: ['newer:jshint:browser']
			},
			jshintNode: {
				files: jsFiles.node,
				tasks: ['newer:jshint:node']
			},
			jshintTest: {
				files: jsFiles.test,
				tasks: ['newer:jshint:test']
			},
			karma: {
				files: [
					'src/js/**/*.js',
					'spec/fixtures/json/*.json'
				],
				tasks: ['karma:dev:run']
			},
			jasmine: {
				files: [
					'server.js',
					'app-locals.js',
					'assets.js',
					'config/default.js',
					'config/env/*.js',
					'lib/*.js',
					'app/controller/*.js',
					'app/views/*.ejs'
				],
				tasks: ['test:server']
			}
		},

		// Run all blocking tasks that cannot be run serially
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			dev: ['nodemon', 'watch', 'karma:dev']
		},

		// Remove all generated output for a clean slate
		clean: [
			'public'
		]
	});

	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-jasmine-node');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-ejs');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-hashify-urls');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-express-server');

	// Load custom, non-npm Envoy tasks like hashifyTemplates
	grunt.loadTasks('./lib/tasks');

	// Builds
	grunt.registerTask('build:dev',  ['copy', 'ejs', 'less']);
	grunt.registerTask('build:prod', ['copy', 'ejs', 'less', 'hashifyUrls', 'ngAnnotate', 'uglify', 'usebanner']);


	// Start jasmine_node server in TEST mode, then reset back to LOCAL
	grunt.registerTask('test:server', ['env:test', 'jasmine_node', 'env:local']);

	// Karma unit tests
	grunt.registerTask('test:unit', ['karma:ci']);

	// Protractor e2e tests
	grunt.registerTask('test:e2e', ['express:test', 'protractor:dev', 'express:test:stop']);
	grunt.registerTask('test:e2e:ci', ['express:test', 'protractor:ci', 'express:test:stop']);

	// All tests
	grunt.registerTask('test', ['build:dev', 'jshint', 'test:server', 'test:unit', 'test:e2e']);

	// Prod
	// Note that protractor:ci runs on the server started by jasmine_node
	grunt.registerTask('prod', ['build:prod', 'jshint', 'test:server', 'test:unit', 'test:e2e:ci']);

	// Default
	grunt.registerTask('default', ['initLocalConfig', 'build:dev', 'concurrent:dev']);

};
