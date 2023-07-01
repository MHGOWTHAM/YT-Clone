

const video_container=document.getElementById("yt-video");
const videoId=localStorage.getItem("videoId");

const commentConatiner=document.getElementById("comment");

video_container.src=`https://www.youtube.com/embed/${videoId}`;

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyD6ZmSHznq4rI7KSlBmW476yz6y_komQ6Y";


async function getComments(){
    const url = `${BASE_URL}/commentThreads?key=${API_KEY}&videoId=${videoId}&maxResults=80&order=time&part=snippet`;
    const response = await fetch(url,{
        method:"get",
    });
    const data = await response.json();
    const comments=data.items;
    
}

function renderComments(comments){
    commentConatiner.innerHTML=``;
    comments.forEach((comment)=>{
        commentConatiner.innerHTML+=`
       <p>${comment.snippet.topLevelComment.snippet.textDisplay}</p> `;
    })
}
getComments()
