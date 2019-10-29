module.exports = function ($logger, $projectData, $injector, hookArgs) {
    var path = require('path');
    var platformName = (hookArgs.checkForChangesOpts && hookArgs.checkForChangesOpts.platform) || (hookArgs.prepareData && hookArgs.prepareData.platform);
    const platformsData = getPlatformsData($injector);
    
    var appDestinationDir = platformsData.getPlatformData(platformName).appDestinationDirectoryPath;

    var patchNpmPackageDir = path.join(appDestinationDir, 'app', 'tns_modules', 'nativescript-nodeify', 'patch-npm-packages.js');

    var patchNpmPackage = require("./patch-npm-packages.js");

    patchNpmPackage($logger, $projectData, hookArgs);
}

function getPlatformsData($injector) {
    try {
        return $injector.resolve("platformsData");
    } catch (err) {
        return $injector.resolve("platformsDataService");
    }
}
