const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

var posts = [{
    id: "1",
    title: "a title",
    views: 100
  },
  {
    id: "2",
    title: "another title",
    views: 200
  },
  {
    id: "3",
    title: "heheehehe",
    views: 340
  }]


//http://127.0.0.1:3000/?view[$gte]=200&view[$lte]=300
app.get('/', (req, res) => {
    console.log(req.query);
    let newPost = posts;
    if(req.query.title){
        newPost = newPost.filter(p=>p.title.includes(req.query.title))
    }
    if(req.query.view){
        //view: { '$gte': '200', '$lte': '200' } 
        //newPost = newPost.filter(p=>p.views>=req.query.view)
        if(req.query.view.$gte){
            newPost = newPost.filter(p=>p.views>=req.query.view.$gte)
        }
        if(req.query.view.$lte){
            newPost = newPost.filter(p=>p.views<=req.query.view.$lte)
        }
    }
    res.send(newPost)
})
app.get('/:id', (req, res) => {
    let id = req.params.id;
    let post = posts.find(p=>p.id == id);
    if(post){
        res.status(200).send(post)
    }else{
        res.status(404).send({message:"iD khong ton tai"})
    }
})
app.post('/', (req, res) => {
   let post = req.body;
    post.id = GenString(16);
   posts.push(post);
   res.status(200).send(post);
})
app.put('/:id', (req, res) => {
    let id = req.params.id;
    let post = posts.find(p=>p.id==id);
    if(post){
        post.title = req.body.title;
        post.views = req.body.views;
        res.status(200).send(post)
    }else{
        res.status(404).send({message:"iD khong ton tai"})
    }
 })
 app.delete('/:id', (req, res) => {
    let id = req.params.id;
    let post = posts.find(p=>p.id==id);
    if(post){
        post.isDelete=true;
        res.status(200).send(post)
    }else{
        res.status(404).send({message:"iD khong ton tai"})
    }
 })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function GenString(length){
    let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = "";
    for (let index = 0; index < length; index++) {
        let rd = Math.floor(Math.random()*source.length);
        result+=source.charAt(rd);
    }
    return result;
}

