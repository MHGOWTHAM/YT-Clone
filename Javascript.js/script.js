const BASE_URL = "https://www.googleapis.com/youtube/v3";

const API_KEY = "AIzaSyD6ZmSHznq4rI7KSlBmW476yz6y_komQ6Y";

let SearchInput = document.getElementById("search");
let searchIcon = document.getElementById("search-icon");
const container=document.getElementById("video-container");

searchIcon.addEventListener("click", SearchVideo);

function SearchVideo(){
   let searchValue = SearchInput.value;
   console.log(searchValue)
   getVideos(searchValue);
}


async function getVideos(q){
    const url = `${BASE_URL}/search?key=${API_KEY}&q=${q}&type=video&maxResults=20`;
    const response = await fetch(url,{
        method:"get",
    });
    const data = await response.json();
    const videos = data.items;
    getVideoData(videos);
}

async function getVideoData(videos){
    const videoData=[];
    for(let i=0;i<videos.length;i++){
        const video=videos[i];
        const video_Id=video.id.videoId;
        videoData.push(await getVideoDetails(video_Id));
    }
    console.log(videoData);
    renderVideos(videoData);
}

async function getVideoDetails(videoId){
    const url =`${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
    const response = await fetch(url,{
        method:"get"
    });
    const data = await response.json();
     return data.items[0];
}

function views(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 100000) {
      return (number / 100000).toFixed(1) + "L";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    }
    
    return number.toString(); 
  }

function renderVideos(videos){
    container.innerHTML=``;
    for(let i=0;i<videos.length;i++){
        const video = videos[i];
        const thumbnailUrl = video.snippet.thumbnails.high.url;
        let count = `${video.statistics.viewCount}`;
        let view = views(count);
        const publish = `${video.snippet.publishedAt}`;
        const date = new Date(publish);
        const today = Date.now();
        const timeDiff = today-date;
        const days = Math.floor(timeDiff/(1000*60*60*24));
        const weeks = Math.floor(days/7);
        const day="";
        if(days>7){
            day=days + " days ago";
        }
        else{
            day=weeks + " weeks ago";
        }
        
        container.innerHTML+=`            
                    <div class="video-info" onclick="openVideoDetails('${video.id}')>
                        <div class="video-image">
                            <img src="${thumbnailUrl}" alt="video title" width=200 >

                        </div>
                        <div class="video-description">
                            <div class="channel-avatar">
                                
                                <p class="video-title" style="font-weight: bold;">${video.snippet.localized.title}</p>
                            </div>
                            <div class="channel-description">
                                <p class="channel-name">${video.snippet.channelTitle}</p>
                            </div>
                            <div class="views-container">
                                <div class="video-views">${view} Views</div>
                                <div class="video-time">${day}</div>
                            </div>
                        </div>
                    </div>`;

    }
}




function openVideoDetails(videoId){
    localStorage.setItem("videoId",videoId);
    window.open("./viedoDetails.html");
}


getVideos("");



//                             Getting an error that you have exceeded your quota 
// {
//     "error": {
//       "code": 403,
//       "message": "The request cannot be completed because you have exceeded your \u003ca href=\"/youtube/v3/getting-started#quota\"\u003equota\u003c/a\u003e.",
//       "errors": [
//         {
//           "message": "The request cannot be completed because you have exceeded your \u003ca href=\"/youtube/v3/getting-started#quota\"\u003equota\u003c/a\u003e.",
//           "domain": "youtube.quota",
//           "reason": "quotaExceeded"
//         }
//       ]
//     }
//   }
 

// let firstScript = document.getElementsByTagName("script")[0] ;
// firstScript.addEventListener("load", onLoadScript)
// function onLoadScript() {
//  	if (YT) {
//     new YT.Player("aravind", {
//  	height: "500",
//  		width: "850",
//  		videoId,
//  		events: {
//  			onReady: (event) => {
//  				        document.title = event.target.videoTitle ;
//  		       	   }
//  	      }
//  	   });
//  	}
// }


