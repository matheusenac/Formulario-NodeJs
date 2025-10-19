//importações
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser");
const { receiveMessageOnPort } = require("worker_threads");

//configurações
const app = express();
const filePath = path.join(__dirname, 'public', 'index.html')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//funcao media
function mediaAluno(aluno, n1, n2, req){
    let media = (n1 + n2)/2
    let result
    if(media>=6){
        result = `<p>O(a) aluno(a) ${aluno} está aprovado. Média final:${media}</p>`
    }else if(media>2){
        result = `<p>O(a) aluno(a) ${aluno} fará o exame final. Média final:${media}</p>`
    }else{
        result = `<p>O(a) aluno(a) ${aluno} está reprovado. Nota final:${media}</p>`
    }
    return result
}
//rotas
app.get("/", (req, res)=>{
    res.sendFile(filePath)
})
app.post("/media", (req, res)=>{
    let aluno = req.body.aluno
    let n1 = Number(req.body.nota1)
    let n2 = Number(req.body.nota2)
    let result = mediaAluno(aluno, n1, n2)
    res.send(result)
})

app.listen(8080)