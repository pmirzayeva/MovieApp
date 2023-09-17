const movieDetail=document.querySelector("#movieDetail")
const movieSearch=document.querySelector("#movieSearch")


movieSearch.addEventListener("keydown",function(e){
    if(e.key==="Enter"){
        const movieTitle=this.value
        console.log(this.value);
        // getMovie(movieTitle)
        getMovieSearch(movieTitle)
        this.value=""
    }

})

async function getMovie(title){
    try{
    const response= await fetch(`http://www.omdbapi.com/?apikey=64ee697&t=${title}`)
    const data=await response.json()
    renderDetail(data)
    }catch(err){
        console.log(err);
    }
}

async function getMovieSearch(title){
    try{
    const response= await fetch(`http://www.omdbapi.com/?apikey=64ee697&s=${title}`)
    const data=await response.json()

    renderSearchResult(data.Search)
    }catch(err){
        console.log(err);
    }
}

function renderDetail(movie){
    console.log(movie);
    movieDetail.innerHTML=`<div class="d-flex gap-5 my-5" >
    <img height="" style="object-fit: cover" src="${movie.Poster}" />
    <div>
    <h1>${movie.Title}</h1>
    <ul>
        <li class="text-warning h5">${movie.imdbRating}</li>
        <li>${movie.Country}</li>
        <li>${movie.Year}</li>
        <li>${movie.Awards==="N/A" ? "Not Provided": movie.Awards}</li>
        <li>${movie.Plot}</li>
    </ul>

    <ul>${movie.Ratings.map((rate)=>`<li class="text-danger h6">${rate.Source}:${rate.Value}</li>`).join("")}</ul>
    </div>
    </div>`
}


function renderSearchResult(movies){
    movieDetail.innerHTML=movies?.map((movie)=>`<div class="d-flex gap-5 my-5 border shadow" >
    <img width="150" height="250" style="object-fit: cover" src="${movie.Poster}" />
    <div class="p-5">
    <h1>${movie.Title}</h1>
    <h1>${movie.Year}</h1>
    <h1>${movie.Type}</h1>
    </div>
    </div>`).join("")
}
