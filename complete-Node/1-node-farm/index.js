const fs  = require('fs');



// Blocking synchronous way
const textIn = fs.readFileSync('./txt/input.txt' , 'utf-8');
console.log(textIn);
const  textOut = ` this is what we know about avocado : ${textIn}. \nCreated on ${Date.now()}`; 
fs.writeFileSync('./txt/output.txt', textOut);
console.log('file written!');


// Non-Blocking A synchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1)=> {
    if(err) return console.log('ERROR');

    fs.readFile(`./txt/${data1}.txt` , 'utf-8', (err, data2)=> {
        console.log(data2);
        fs.readFile('./txt/append.txt' , 'utf-8', (err, data3)=> {
            console.log(data3);
            

            fs.writeFile('./txt/final.txt', `${data3}`,'utf-8', err => { 
                console.log("the file is written");
            });  // `${data3}`  this is means will take the text data from this file and write it in the final.txt
        });
    });
});
console.log("** will read this line befor Reading files ")





