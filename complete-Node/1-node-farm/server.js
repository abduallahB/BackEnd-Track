const http   = require('http');
const url    = require('url');
const fs     = require('fs');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');


const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')  ;
const tempCard = fs.readFileSync(`${__dirname}/templates/templates-card.html`, 'utf-8')  ;
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')  ;

// we read API  path outside as synchronus way 
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')  ;
// to get data from path diretory in the terminal as a JSON
 const dataObj = JSON.parse(data);


// slugify
const slugs = dataObj.map(el => slugify(el.productName , {lower : true})) // this is for all products 
console.log(slugs); 


// 1 CREATE A  SERVER
// we need to save the coming result from server in new variable
const server = http.createServer((req , res) => {
   const {query, pathname} = url.parse(req.url, true);
 
    //overview page
    if(pathname === '/' || pathname === '/overview') {        
        res.writeHead(200 , {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el =>  replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output);


    //product page
    } else if (pathname ==='/product'){
        res.writeHead(200 , {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product)
        res.end(output);


    //Api page    
    } else if(pathname === '/api' ){
           // to send data into browser  as a JSON data  
            res.writeHead(200 , {'Content-type': 'application/json'})
            res.end(data);



    //Not found 
    }else {
        res.writeHead(404);
        res.end(400 , {
            'Content-type': 'text/html',
            'my-own-header' :'hello world'
        });
        res.end('<h2> page not found </h2>')
    }
 });
 

 // 2 start server by open listening on the $port 
 server.listen(8000, '127.0.0.1', () => {
     console.log('server start listening on port 8000');
 });



