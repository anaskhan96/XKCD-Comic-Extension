function fetchLatest(){
    $.ajax({
        url: "https://dynamic.xkcd.com/api-0/jsonp/comic?callback=?",
        dataType: "json",
        jsonpCallback: "xkcddata",
        success: function(response){
            lastNum=response['num'];
            data=response;
            console.log(response);
            comicDiv=document.getElementById("comic");
            comicDiv.innerHTML="";
            comicTitle=document.createElement("p");
            comicTitle.innerHTML=data['title'];
            comicImg=document.createElement("img");
            comicImg.setAttribute("src",data['img']);
            comicImg.setAttribute("title",data['alt']);
            comicLink=document.createElement("a");
            comicLink.setAttribute("href","http://xkcd.com/"+data['num']);
            comicLink.setAttribute("title","Not that it makes a difference");
            comicLink.innerHTML="View on XKCD";
            comicDiv.appendChild(comicTitle);
            comicDiv.appendChild(comicImg);
            comicDiv.appendChild(comicLink);
        },
        error: function(error){
            console.log("Sorry! An error occurred. Please check the console log for details.");
        }
    });
}
function fetchRandom(){
    number=Math.floor(Math.random()*lastNum)+1;
    $.ajax({
        url: "https://dynamic.xkcd.com/api-0/jsonp/comic/"+number+"?callback=?",
        dataType: "json",
        jsonpCallback: "xkcddata",
        success: function(response){
            console.log(response);
            data=response;
            comicDiv=document.getElementById("comic");
            comicDiv.innerHTML="";
            comicTitle=document.createElement("p");
            comicTitle.innerHTML=data['title'];
            comicImg=document.createElement("img");
            comicImg.setAttribute("src",data['img']);
            comicImg.setAttribute("title",data['alt']);
            comicLink=document.createElement("a");
            comicLink.setAttribute("href","http://xkcd.com/"+data['num']);
            comicLink.setAttribute("title","Not that it makes a difference");
            comicLink.innerHTML="View on XKCD";
            comicDiv.appendChild(comicTitle);
            comicDiv.appendChild(comicImg);
            comicDiv.appendChild(comicLink);
        },
        error: function(error){
            console.log("Sorry! An error occurred. Please check the console log for details.");
        }
    });
}
function display(e){
    if(e.target.id=="latest")
        fetchLatest();
    else
        fetchRandom();
}
//To allow the extension to open any particular url in a new tab
$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});

data={};
var latestButton=document.getElementById("latest");
var randomButton=document.getElementById("random");

fetchLatest(); //fetching the latest comic

latestButton.addEventListener("click",display,false);
randomButton.addEventListener("click",display,false);