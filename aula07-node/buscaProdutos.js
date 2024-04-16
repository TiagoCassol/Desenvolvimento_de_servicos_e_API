const http = require('http');
const hostname = '127.0.0.1' ;
const port = 3000;

const mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database:'loja'
});

const server = http.createServer((req,res)=>{
    res.statusCode = 200
    // res.setHeader('Content-type','application/plain');
    res.setHeader('Content-type','text/plain');
    conn.connect( function(erro){
        if(!erro){
            sql = "SELECT p.id,p.nome as nomeProduto,p.preco, p.quantidade,c.nome FROM produto p inner join categoria c on p.codCategoria = c.id ORDER BY nome";
            conn.query(sql,function(err,result,fields){
                if(!err){
                    res.end(JSON.stringify(result) );
                    //res.end(result);
                }else{
                    res.end('{"resposta" : "Erro ao executar a consulta"}');
                }
            });
        }else{
            res.end('{"resposta" : "Erro na conexão" }'); 
        }
    });
});

server.listen(port, hostname,()=>{
    console.log('servidor sendo executado em http://'+hostname+':'+port+'/')
})