const URL = 'http://localhost:3000/posts';
var global;
LoadDataSync();

async function LoadDataSync(){
    let res = await fetch(URL);
    let posts = await res.json();
    posts = posts.filter(p=>!p.isDelete)
    global = posts;
    let body = document.getElementById("body");
    body.innerHTML="";
    for (const post of posts) {
        body.innerHTML += ConvertFromObjToHtml(post);
    }
}

function checkExistID(id){
    let ids = global.map(p=>p.id);
    return  ids.includes(id+"");
}
function getMaxID(){
    let ids = global.map(p=>Number.parseInt(p.id));
    return  Math.max(...ids);
}

function Save(){
    let id = document.getElementById("id").value;
    if(id.length==0||isNaN(id)){
        id = (getMaxID()+1)+"";
    }
    let obj = {
        id: id,
        title: document.getElementById("title").value,
        views: document.getElementById("views").value,
    }
    if(checkExistID(id)){
        fetch(URL+"/"+id,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        }).then(
            function(){
                LoadDataSync();
            }   
        )
    }else{
    fetch(URL,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then(
        function(){
            LoadDataSync();
        }   
    )
    }  
}

function Delete(id){
    let post = global.filter(p=>p.id==id)[0];
    post.isDelete=true;
    fetch(URL+"/"+id,{
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(post)
    }).then(
        function(){
            LoadDataSync();
        }   
    )
}

function LoadData(){
    fetch(URL).then(
        function(data){
            return data.json();
        }
    ).then(
        function(data){
            console.log(data);
        }
    )
}
function ConvertFromObjToHtml(post){
    let string = '<tr>';
    string += `<td>${post.id}</td>`;
    string += `<td>${post.title}</td>`;
    string += `<td>${post.views}</td>`;
    string += `<td><button  onclick="Delete(${post.id});return false;">Delete</button></td>`;
    string += '</tr>';
    return string;
}

