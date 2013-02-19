module.exports = function (grunt) {

    grunt.initConfig({
        // uglify: {
        //   'dist/built.min.js': 'dist/built.js'
        // },

        /*
         A simple ordered concatenation strategy.
         This will start at app/app.js and begin
         adding dependencies in the correct order
         writing their string contents into
         'build/application.js'

         Additionally it will wrap them in evals
         with @ sourceURL statements so errors, log
         statements and debugging will reference
         the source files by line number.

         You would set this option to false for
         production.
         */
        neuter:{
            options:{
                    includeSourceURL:true
            },

            application_options:{

                src: ['app/app.js'],
                dest: 'public/application.js'

            }

        },

        /*
         Watch files for changes.

         Changes in dependencies/ember.js or application javascript
         will trigger the neuter task.

         Changes to any templates will trigger the ember_templates
         task (which writes a new compiled file into dependencies/)
         and then neuter all the files again.
         */
        watch:{
            application_code:{
                files:['app/controllers/**', 'app/models/**','app/routes/**', 'app/templates/**', 'app/app.js' ],
                tasks:['ember_templates', 'neuter', 'watch']
            },
            handlebars_templates:{
                files:['app/templates/**/*.hbs'],
                tasks:['ember_templates', 'neuter', 'watch']
            }
        },


        /*
         Finds Handlebars templates and precompiles them into functions.
         The provides two benefits:

         1. Templates render much faster
         2. We only need to include the handlebars-runtime microlib
         and not the entire Handlebars parser.

         Files will be written out to dependencies/compiled/templates.js
         which is required within the project files so will end up
         as part of our application.

         The compiled result will be stored in
         Ember.TEMPLATES keyed on their file path (with the 'app/templates' stripped)
         */
        ember_templates:{
            options:{
                templateName:function (sourceFile) {
                    return sourceFile.replace(/app\/templates\//, '');
                }
            },
            'app/dependencies/compiled/templates.js':["app/templates/**/*.hbs"]
        }


    });

    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-neuter');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ember-templates');

    /*
     Default task. Compiles templates, neuters application code, and begins
     watching for changes.
     */
    grunt.registerTask('default', ['ember_templates', 'neuter', 'watch']);
};