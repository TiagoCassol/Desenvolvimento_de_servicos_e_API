// console.log("olá mundo") 
const http = require('http');
const hostname = '127.0.0.1' ;
const port = 3000;

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    res.end("olá mundo")
});
server.listen(port, hostname,()=>{
    console.log('servidor sendo executado em http://'+hostname+':'+port+'/')
})