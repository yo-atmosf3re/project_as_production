/* eslint-disable  */
var path = require('path');
var fs = require('fs');

var cachePathFolder = process.cwd() + '\\node_modules\\.cache';
console.log(cachePathFolder, 'cachePathFolder');

(
    function clearCache(folderPath) {
    var folderExist = fs.existsSync(cachePathFolder)
        
        if(folderExist) {
            fs.readdirSync(folderPath).forEach((file, index) => {
                var currentPath = path.join(folderPath, file);
                
                if (
                    fs.lstatSync(currentPath).isDirectory()
                ) {
                clearCache(currentPath);
                } else {
                fs.unlinkSync(currentPath);
                }
                
            });
            
            fs.rmdirSync(folderPath);
            console.log('CACHE HAS BEEN CLEARED');
        }
}
)
(cachePathFolder);
