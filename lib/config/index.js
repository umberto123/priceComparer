var path = require('path');
var _ = require('lodash');
var nconf = require('nconf');
var appDir = path.dirname(require.main.filename);

module.exports = (function configWrapper() {
    var config = {};
    var configDirectory;
    var configFilename;

    /**
     * Public functions
     */

    /**
     * Initialize configutation with provided options
     * @param  {JSON} options in the following
     * {
     *      configDirectory: /* the directory that contains configuration files (per environment - local.json, local.json, etc.)
     *      configFilename:  /* non-mandatory - to be used when need to load a specific config file.
     * }
     * @return {null}
     * @static
     */
    config.init = function init(options) {
        configDirectory = (options && _.trimRight(options.configDirectory, '/')) || getDefaultConfigDirectory();
        configFilename = (options && _.trimRight(options.configFilename, '/')) || (configDirectory + '/' + getDefaultConfigFilename());

        //config overriding chain: Commandline args --> Environment variables --> Config file
        nconf.argv().env().file({file: configFilename});

        return this;
    };

    /**
     * Get a value from the configuration
     * @param  {String} key - the key to get the value for
     * @return an object (Json or primitive)
     * @static
     */
    config.get = function get(key) {
        return nconf.get(key);
    };


    /**
     * Get the path that the config was loaded from
     * @param
     * @return a string
     * @static
     */
    config.getConfigDirectory = function getConfigDirectory() {
        return configDirectory;
    };

    config.getConfigFilename = function getConfigDirectory() {
        return configFilename;
    };

    /**
     * Private functions
     */
    function getDefaultConfigDirectory() {
        return appDir + '/config';
    }

    function getDefaultConfigFilename() {
        return getEnv() + '.json';
    }

    function getEnv() {
        process.env.NODE_ENV = process.env.NODE_ENV || 'local';
        return process.env.NODE_ENV;
    }

    return config;
})();