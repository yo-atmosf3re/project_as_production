/* eslint-disable  */
var path = require('path');
var fs = require('fs');

// ? Получение пути до папки, которую нужно удалить;
var cachePathFolder = process.cwd() + '\\node_modules\\.cache';

(
    function clearCache(folderPath) {
    // ? Флаг, показывающий существует ли директория по указанному пути;
    var folderExist = fs.existsSync(cachePathFolder)
        
        // ? Проверка существования директории на основании вышеописанного флага;
        if(folderExist) {
            // ? Рекурсивное удаление;
            fs.readdirSync(folderPath).forEach((file, index) => {
                // ? Текущий файл;
                var currentPath = path.join(folderPath, file);
                
                // ? Проверка на директорию текущего файла;
                if (fs.lstatSync(currentPath).isDirectory()) {
                    // ? Вызов функции до тех пор, пока передаваемый текущий файл не перестанет являться директорией;
                    clearCache(currentPath);
                } else {
                    // ? Удаление файла в случае, если передаваемый текущий файл не является директорией;
                    fs.unlinkSync(currentPath);
                }
                
            });
            
            // ? Удаление пустой директории;
            fs.rmdirSync(folderPath);
            console.log('CACHE HAS BEEN CLEARED');
        }
}
)
(cachePathFolder);
