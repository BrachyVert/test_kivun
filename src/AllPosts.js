
import * as React from 'react';
import { useState, useEffect } from 'react';



export default function GetPosts(props){
    const [allPost,setAllPost]=useState([]);
    const [myPost,setMyPost]=useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
       .then((response) => {
           if (response.ok && response.status == 200) {
               return response.json()
           }
       })
       .then(data => {
        setAllPost(data);
       }).catch((error) => { console.log(error); alert(error) });
       
    }, [])

return(
    <div>
        {allPost?<div>
            { props.IdPosts.forEach(id => {
           {setMyPost(
                allPost.filter(post => post.userId == id )
                    .map(post => (
                    <div>
                        <input type="text" value={post.userId}></input>
                        <br/>
                        <input type="text" value={post.title}></input>
                        <br/>
                        <input type="text" value={post.body}></input>
                        <br/>
                        </div>
                  )))}
                      })} </div>:<div>null</div>}
        { props.IdPosts.forEach(id => {
            setMyPost(
                allPost.filter(post => post.userId == id )
                    .map(post => (
                    <div>
                        <input type="text" value={post.userId}></input>
                        <br/>
                        <input type="text" value={post.title}></input>
                        <br/>
                        <input type="text" value={post.body}></input>
                        <br/>
                        </div>
                  )))
        })}
       
    </div>
)
    
   }
