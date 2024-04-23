const express = require('express')
const app = express()
const port = 3000

produtos = ["coca-cola","pepsi","fanta"]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/produto', (req, res) => {
    res.send(produtos)
  })

app.get('/produto/:idProd', (req, res) => {
    index = parseInt(req.params.idProd) -1
    res.send(produtos[index] )
  })

app.delete('/produto/:idProd', (req, res) => {
    index = parseInt(req.params.idProd) -1
    produtos.splice( index, 1 ) 
    res.send("produto removido" )
  })

app.post('/produto/', (req, res) => {
    nome = "Prod_"+produtos.length
    produtos.push(nome)
    res.send("Produto "+ nome +" adicionado")
  })
  
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`)
})