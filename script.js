

let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

const logs=document.querySelector("#logs");
const card=document.querySelector(".card");
const cardImage=document.querySelector("#card-image");
const cardTitle=document.querySelector("#card-title");
const cardReleaseYear=document.querySelector("#card-release-year");
const cardViewDetails=document.querySelector("#view-details");
const modalContent=document.querySelector("#modal-content");
const cardContainer=document.querySelector(".card");
const viewDetailsButton=document.querySelector("#view-details")
const modalElement=document.querySelector("#modal");
const closeModalButton=document.querySelector("#close-modal-button");
const likeButton=document.querySelector("#like-button");
const favouriteContent = document.querySelector(".favourites");
const queryString=document.querySelector("#query-string");
const searchButton=document.querySelector("#search-button");
const favouriteHeading=document.querySelector('#favourite-heading');
const modeButton=document.querySelector("#mode");
const websiteTitle=document.querySelector("#title1");

const fetchMovie=async(str)=>{
    
    logs.innerText="";
    logs.hidden=true;
    
           
            

    try{
        console.log(`searched for ${str}`)
        
        const data=await fetch(`http://www.omdbapi.com/?apikey=cd3e29a5&t=${str}`).then((response)=>response.json());
        
        
        likeButton.style.color="white";
        if(data.Response==="False")throw new Error(data.Error || "Movie not found!");

       
        
            
           
            
        

        cardImage.src=data.Poster;
        cardImage.alt="Failed to retrieve poster";
    
        cardTitle.innerText=data.Title;
        cardReleaseYear.innerText=`Released in ${data.Year}`;
        
        card.hidden=false;
        cardContainer.style.borderStyle="solid";
        cardContainer.style.borderColor="white";
        cardViewDetails.innerText="View Details";
        modalContent.innerText=`Genre: ${data.Genre} \n \n IMDB Ratings :${data.imdbRating || "Not rated"} \n \n Plot: ${data.Plot}`;
    
        const title=document.querySelector("#card-title").innerText;
        let currList = JSON.parse(localStorage.getItem("favourites")) || [];
        currList.includes(title)===true?likeButton.style.color="#FAD5A5":likeButton.style.color = "white"; 
    
        console.log(data);
        
        
    }
    catch(e){
        
      
        logs.innerText="Could not find any suitable results";
        logs.style.color="white";
        
        logs.hidden=false;
            
        
    }
    

}

const title1 = document.getElementById('title1');
const title2 = document.getElementById('title2');


title1.addEventListener('mouseover', () => {
    title1.style.color = "#FAD5A5";
    title2.style.color = "#EEEEEE"; 
});

// Hover out event
title1.addEventListener('mouseout', () => {
    title1.style.color = '#EEEEEE'; 
    title2.style.color = '#FAD5A5'; 
});
searchButton.addEventListener("click",()=>{
   
   
    modalElement.hidden=true;
    card.hidden=true;
    
   
    fetchMovie(queryString.value);
   
    
}
);


viewDetailsButton.addEventListener("click",()=>{
    
    
            
            
    modalElement.hidden=false;
    modalElement.display="flex";
    modalElement.flexDirection="row";
    
    setTimeout(() => {
       
        modalElement.style.transform = "scale(1)";
    }, 10);
});
closeModalButton.addEventListener("click",()=>{
    
    
    modalElement.style.transform = "scale(0.9)";
    setTimeout(() => {
        modalElement.hidden=true;
    }, 300); 
    card.hidden=false;
    
})
likeButton.addEventListener("click",()=>{
    //favourite
    let currList = JSON.parse(localStorage.getItem("favourites")) || [];
    console.log("button clicked");
    const title=document.querySelector("#card-title").innerText;
    if (!currList.includes(title)){
        
        currList.push(title);
   
        localStorage.setItem("favourites", JSON.stringify(currList));
        likeButton.style.color="#FAD5A5";
        console.log(`liked ${title}`);
        populateFavourites();
        
    }
    else{
        //unfavouritee
        currList = currList.filter(item => (item !== title));

        localStorage.setItem("favourites", JSON.stringify(currList));
        likeButton.style.color = "white"; 
        console.log(`Unliked ${title}`);
        populateFavourites();
        
    }
    

});
const populateFavourites=()=>{
    const arr = JSON.parse(localStorage.getItem("favourites")) || [];
    
    favouriteContent.innerHTML = "";
    
   
  

    if (!arr || arr.length === 0) {
        const noFavouritesMsg = document.createElement("p");
        noFavouritesMsg.innerText = "No favourites to display";
        noFavouritesMsg.style.color = "white";
        favouriteContent.appendChild(noFavouritesMsg);
    } else {
        
        arr.forEach((ele) => {
            const favItem = document.createElement("div");
            favItem.innerText = ele;
            favItem.style.color = "white"; 
            favItem.className="favourite-item";
            favouriteContent.appendChild(favItem);
        });
    }

}
populateFavourites();
