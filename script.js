

// let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

const logs=document.querySelector("#logs");
const card=document.querySelector(".card");
const cardImage=document.querySelector("#card-image");
const cardTitle=document.querySelector("#card-title");
const cardReleaseYear=document.querySelector("#card-release-year");
const cardViewDetails=document.querySelector("#view-details");
const modalContent=document.querySelector("#modal-content");
const cardContainer=document.querySelector(".card");
// const viewDetailsButton=document.querySelector("#view-details")
const modalElement=document.querySelector("#modal");
const closeModalButton=document.querySelector("#close-modal-button");
// const likeButton=document.querySelector("#like-button");
// const favouriteContent = document.querySelector(".favourites");
const queryString=document.querySelector("#query-string");
const searchButton=document.querySelector("#search-button");
// const favouriteHeading=document.querySelector('#favourite-heading');
// const modeButton=document.querySelector("#mode");

const contentDiv = document.querySelector(".content");
const favouritesList=document.querySelector(".favourites-list");

// const fetchMovie=async(str)=>{
    
//     logs.innerText="";
//     logs.hidden=true;
    
           
            

//     try{
//         console.log(`searched for ${str}`)
        
//         const data=await fetch(`http://www.omdbapi.com/?apikey=cd3e29a5&t=${str}`).then((response)=>response.json());
        

//         if(data.Response==='True')displayMovieList(data.Search);
        
//         likeButton.style.color="white";
//         if(data.Response==="False")throw new Error(data.Error || "Movie not found!");

       
        
            
           
            
        

//         cardImage.src=data.Poster;
//         cardImage.alt="Failed to retrieve poster";
    
//         cardTitle.innerText=data.Title;
//         cardReleaseYear.innerText=`Released in ${data.Year}`;
        
//         card.hidden=false;
//         cardContainer.style.borderStyle="solid";
//         cardContainer.style.borderColor="white";
//         cardViewDetails.innerText="View Details";
//         modalContent.innerText=`Genre: ${data.Genre} \n \n IMDB Ratings :${data.imdbRating || "Not rated"} \n \n Plot: ${data.Plot}`;
    
//         const title=document.querySelector("#card-title").innerText;
//         // let currList = JSON.parse(localStorage.getItem("favourites")) || [];
//         // currList.includes(title)===true?likeButton.style.color="#FAD5A5":likeButton.style.color = "white"; 
    
//         console.log(data);
        
        
//     }
//     catch(e){
        
      
//         logs.innerText="Could not find any suitable results";
//         logs.style.color="white";
        
//         logs.hidden=false;
            
        
//     }
    

// }

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
populateFavourites();
const loadMovies=async(searchTerm)=>{
    const data=await fetch(`http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=cd3e29a5`).then((response)=>response.json());
        

        if(data.Response==='True'){
            displayMovieList(data.Search);
            console.log(data);
        }
        else{
            contentDiv.hidden=true;
            movieGrid.hidden=true;
            logs.hidden=false;
            logs.innerText=data.Error;
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
    else{
       
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
        currList.includes(movie.imdbID)?cardHTML = `
            <div class="movie-card">
                   <div id="like-container" >
                       <i class="material-icons"  class="like-button yellow-color" onclick="likeButton('${movie.imdbID}' ,this)">favorite</i>

                    </div>
                <img class="movie-card-img" src="${moviePoster}" alt="Movie Poster">
                <div class="movie-card-info">
                   
                        <h3>${movie.Title}</h3>
                        <p>Year: ${movie.Year}</p>
                        <button class="details-btn" onclick="viewDetailsButton('${movie.imdbID}')">View Details</button>
                    
                    
                </div>
            </div>
        `:
        cardHTML = `
            <div class="movie-card">
                   <div id="like-container" >
                       <i class="material-icons"  class="like-button white-color" onclick="likeButton('${movie.imdbID}' ,this)">favorite</i>

                    </div>
                <img class="movie-card-img" src="${moviePoster}" alt="Movie Poster">
                <div class="movie-card-info">
                    <h3>${movie.Title}</h3>
                    <p>Year: ${movie.Year}</p>
                    <button class="details-btn" onclick="viewDetailsButton('${movie.imdbID}')">View Details</button>
                </div>
            </div>
        `;

         

        movieGrid.innerHTML += cardHTML;
    });

    contentDiv.appendChild(movieGrid);
};


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

            modalElement.hidden = false; 

      
            document.getElementById("close-modal-button").addEventListener("click", () => {
                modalElement.hidden = true;
            });
        } else {
            console.error("Movie details not found:", data.Error);
        }
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
};

closeModalButton.addEventListener("click",()=>{
    
    
    modalElement.style.transform = "scale(0.9)";
    setTimeout(() => {
        modalElement.hidden=true;
    }, 300); 
    card.hidden=false;
    
})

const likeButton = (movieID, buttonElement) => {
    let currList = JSON.parse(localStorage.getItem("favourites")) || [];

    if (!currList.includes(movieID)) {
        currList.push(movieID);
        localStorage.setItem("favourites", JSON.stringify(currList));
        buttonElement.style.color = "#FAD5A5";  
        populateFavourites();
    } else {
        currList = currList.filter(item => item !== movieID);
        localStorage.setItem("favourites", JSON.stringify(currList));
        buttonElement.style.color = "white";  
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
    favouritesList.hidden?favouritesList.hidden=false:favouritesList.hidden=true;
});
myFavouritesButton.addEventListener("click",()=>{
    favouritesList.hidden?favouritesList.hidden=false:favouritesList.hidden=true;
});

favouritesList.addEventListener("hover",()=>{
  favouritesList.hidden=false;
})

const wholeViewport=document.querySelector(".center-a-div");
wholeViewport.addEventListener("click",()=>{
    if(!favouritesList.hidden)favouritesList.hidden=true;
})

findMovies();

