/* eslint-env node */

/*
 After you have changed the settings under responsive_images
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          concurrency: require('os').cpus().length - 1,
          engine: 'im',
          sizes: [
            {
              name: "small",
              width: 80,
              suffix: '_3x',
              quality: 50
            },
            {
              name: "medium",
              width: 160,
              suffix: '_2x',
              quality: 75
            },
            {
              name: "large",
              width: 320,
              suffix: '_1x',
              quality: 90
            }
          ]
        },

        
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'src/images',
          dest: 'src/images/generated'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['src/images/generated'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['src/images/generated']
        },
      },
    },

  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images']);

};
