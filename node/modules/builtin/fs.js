/* fs - filesystem
 *    - a module for CRUD and other operations on the absolute and relative file
 *
 *
 *    + mkdir(Path, Callback)
 *    + writeFile(Path, Data, [Options], Callback)
 *      - { flag : 'a' }
 *      - object that toggles data appending
 *    + readFile(Path, Encoding, Callback(err, data))
 *    + readdir(Path, Callback(err, data))
 *    + rename(OldPath, NewPath, Callback)
 *    + unlink(Path, Callback)
 *
 *
 *    - callbacks:
 *          - oftenly used for error handling
 *          - (err, data)
 *          - most oftenly the error comes first
 */    

const fs = require("fs");


fs.mkdir("./testfromFS/", err => {
    if(err){
        console.log(`erorr ${err}`);
        return;
    } else{
        console.log("done making dir");
    }
    console.log();
});


// writing file
fs.writeFile(`./testfromFS/test.txt`, "i must conquer", { flag : 'a' }, err => {
    console.log("writing a file\n======================");
    if(err){
        console.log(`erorr ${err}`);
        return;
    } else{
        console.log("done making a file");
    }
    console.log();
});


// reading file
fs.readFile("./testfromFS/test.txt", {encoding : 'utf-8'}, (err, data) => {
    console.log("reading a file\n======================");
    if(err){
        console.log(`error: ${err}`);
        return;
    } else{
        console.log(data);
    }
    console.log();
});


// read directory
fs.readdir("./testfromFS", (err, data) => {
    console.log("reading a dir\n======================");
    if(err){
        console.log(`error ${err}`);
        return;
    } else{
        console.log(data);
    }
    console.log();
});


// rename a dir/file
fs.rename("./testfromFS/test.txt", "./testfromFS/test2.txt", err => {
    console.log("reading a dir\n======================");
    if(err){
        console.log(`error ${err}`);
        return;
    } else{
        console.log("done rename file to text2");
    }
    console.log();
});

fs.unlink("./testfromFS/testdel.txt", err => {
    console.log("reading a dir\n======================");
    if(err){
        console.log(`error ${err}`);
        return;
    } else{
        console.log("done deletion");
    }
    console.log();
});
