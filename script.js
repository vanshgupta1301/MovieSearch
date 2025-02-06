//class selectors
const contentDiv = document.querySelector(".content");
const favouritesList=document.querySelector(".favourites-list");
const mobileTray=document.querySelector(".mobile-tray");
const grid=document.querySelector(".grid");

//id selectors
const logs=document.querySelector("#logs");
const cardViewDetails=document.querySelector("#view-details");
const modalContent=document.querySelector("#modal-content");
const modalElement=document.querySelector("#modal");
const closeModalButton=document.querySelector("#close-modal-button");
const queryString=document.querySelector("#query-string");
const searchButton=document.querySelector("#search-button");

//helper functions
const isHidden=(ele)=>{
  return ele.hidden;
}
const setHidden=(ele)=>{
    ele.hidden=true;
}
const setUnhidden=(ele)=>{
    ele.hidden=false;
}


const populateFavourites=async()=>{
    const arr = JSON.parse(localStorage.getItem("favourites")) || [];
    favouritesList.innerHTML="";

    if(!arr || arr.length===0){
        let listItem=document.createElement("div");
        listItem.dataset.id="no_favourites_msg";
        listItem.classList.add("favourites-list-item");
        listItem.innerHTML=`
        <div class="favourites-list-item">
         
         <span>No Favourites to display</span>
         
       </div>
     `;
     favouritesList.appendChild(listItem);
    }
    for(let i=0;i<arr.length;i++){
        let listItem=document.createElement("div");
        listItem.dataset.id=arr[i];
        listItem.classList.add("favourites-list-item");
        try{
            const response = await fetch(`http://www.omdbapi.com/?i=${arr[i]}&apikey=cd3e29a5`);
            const data = await response.json();
            let moviePoster = data.Poster !== "N/A" ? data.Poster : "not_found.jpeg";
            listItem.innerHTML=`
               <div class="favourites-list-item">
                <img class="favourites-list-item-img" src="${moviePoster}" alt="Movie">
                <span>${data.Title}</span>
                
              </div>
            `;
            favouritesList.appendChild(listItem);
        }
        catch(e){
            console.log(error);
        }
        
    }

}

//initial call
populateFavourites();

const loadMovies=async(searchTerm)=>{
    try{
        const data=await fetch(`http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=cd3e29a5`).then((response)=>response.json());
        if(data.Response==='True'){
            displayMovieList(data.Search);
            console.log(data);
        }
        else{
            console.log(data.Error);
        }
    }
   catch(e){
     console.log(e.Error);
   }
}
const findMovies=()=>{
    let searchTerm=(queryString.value).trim();
    console.log(searchTerm);
    if(!searchTerm || searchTerm.length===0){
        loadMovies(`spiderman`);
    }
    if(searchTerm.length>0){
        
        loadMovies(searchTerm);
    }
}
const displayMovieList = (movies) => {
    contentDiv.innerHTML = ""; 
    const movieGrid = document.createElement("div");
    movieGrid.classList.add("movie-grid");
    let currList=JSON.parse(localStorage.getItem("favourites")) || [];
    movies.forEach((movie) => {
        let moviePoster = movie.Poster !== "N/A" ? movie.Poster : "not_found.jpeg"; 
        let cardHTML=``;
        currList.includes(movie.imdbID)?
        cardHTML=`
            <div class="movie-card">
            
              <div class="movie-card-header">
                    
                    <i class=" material-icons details-btn " onclick="viewDetailsButton('${movie.imdbID}')">info</i>
                    
            
                 
                       <i class="material-icons like-button yellow-color" id="${movie.imdbID}" onclick="likeButton('${movie.imdbID}' ,this)">favorite</i>

                    
              </div>
                    
                <img class="movie-card-img" src="${moviePoster}" alt="Movie Poster">
                <div class="movie-card-info">
                        
                        <h4>${movie.Title}(${movie.Year})</h4>
 
                </div>
            </div>
        `:cardHTML=`
        <div class="movie-card">
            <div class="movie-card-header">
                    
                    <i class=" material-icons details-btn " onclick="viewDetailsButton('${movie.imdbID}')">info</i>
                    
            
                 
                       <i class="material-icons like-button white-color" id="${movie.imdbID}" onclick="likeButton('${movie.imdbID}' ,this)">favorite</i>

                    
            </div>
            
                <img class="movie-card-img" src="${moviePoster}" alt="Movie Poster">
                <div class="movie-card-info">
                        
                        <h4>${movie.Title}(${movie.Year})</h4>
                        
                    
                    
                </div>
            </div>
         `
        movieGrid.innerHTML += cardHTML;
    });

    contentDiv.appendChild(movieGrid);
};

searchButton.addEventListener("click",()=>{
    
        let searchTerm=(queryString.value).trim();
   
     if(!searchTerm || searchTerm.length===0){
        console.log("No Titles match the description");
        
     }
     if(searchTerm.length>0){
        
            loadMovies(searchTerm);
       
        
        
     }
    
})

const title1 = document.getElementById('title1');
const title2 = document.getElementById('title2');


title1.addEventListener('mouseover', () => {
    title1.style.color = "#FAD5A5";
    title2.style.color = "#EEEEEE"; 
});


title1.addEventListener('mouseout', () => {
    title1.style.color = '#EEEEEE'; 
    title2.style.color = '#FAD5A5'; 
});


const viewDetailsButton = async (movieID) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?i=${movieID}&apikey=cd3e29a5`);
        const data = await response.json();

        if (data.Response === "True") {
            modalContent.innerHTML = `
                <h2>${data.Title}</h2>
                
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>IMDB Rating:</strong> ${data.imdbRating || "Not rated"}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                
            `;

            setUnhidden(modalElement);

            const closeModalButton=document.getElementById("close-modal-button")
            if(closeModalButton){
                closeModalButton.addEventListener("click", () => {
                    setHidden(modalElement);
                });
            }
            
        } else {
            setUnhidden(logs);
            logs.innerHTML=data.Error;
            console.error("Movie details not found:", data.Error);
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
};


const likeButton = (movieID, buttonElement) => {
    let currList = JSON.parse(localStorage.getItem("favourites")) || [];

    if (!currList.includes(movieID)) {
        currList.push(movieID);
        localStorage.setItem("favourites", JSON.stringify(currList));
        buttonElement.style.color = "#FAD5A5";  
        buttonElement.style.transform="scale(1.1)"
        buttonElement.style.transition="0.3s ease-in-out";
        populateFavourites();
    } else {
        currList = currList.filter(item => item !== movieID);
        localStorage.setItem("favourites", JSON.stringify(currList));
        buttonElement.style.color = "white";  
        buttonElement.style.transition="0.3s ease-in-out";
        populateFavourites();
    }
};


document.querySelectorAll(".details-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        console.log("hello");
        
        const movieID = e.target.getAttribute("data-id");  
        openModal(movieID);  
    });
});

const myFavouritesButton=document.querySelector("#my-favourites");

myFavouritesButton.addEventListener("mouseover",()=>{
    isHidden(favouritesList)?setUnhidden(favouritesList):setHidden(favouritesList);
});
myFavouritesButton.addEventListener("click",()=>{
    isHidden(favouritesList)?setUnhidden(favouritesList):setHidden(favouritesList);
});
favouritesList.addEventListener("hover",()=>{
  setUnhidden(favouritesList);
})

const wholeViewport=document.querySelector(".center-a-div");
wholeViewport.addEventListener("click",()=>{
    if(!isHidden(favouritesList))setHidden(favouritesList);
})

document.addEventListener("DOMContentLoaded",()=>{
    findMovies();
})

const menubar=document.querySelector("#menu");
mobileTray.addEventListener("click",()=>{

    setUnhidden(menubar);
})