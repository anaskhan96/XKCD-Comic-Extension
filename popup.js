function fetch(n){
    $.ajax({
        url: "https://dynamic.xkcd.com/api-0/jsonp/comic/"+n+"?callback=?",
        dataType: "json",
        jsonpCallback: "xkcddata",
        success: function(response){
            if(n=="")
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
function display(e){
    if(e.target.id=="latest")
        fetch(""); // fetching the latest comic
    else
        fetch(Math.floor(Math.random()*lastNum)+1); // fetching any random comic
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

fetch(""); //fetching the latest comic on first run

latestButton.addEventListener("click",display,false);
randomButton.addEventListener("click",display,false);