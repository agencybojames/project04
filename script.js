const app = {};

app.yummlyApiKey = '4232b467d64427cc7880acacaa0f27bc';
app.yummlyApiUrl = 'http://api.yummly.com/v1/api/recipes?'; // http://api.yummly.com/v1/api/metadata/
app.yummlyApiID = '44d38b57';

app.movieDBKey = '59be6234ea545ba637c135657e114e1d'
app.movieDBUrl = 'https://api.themoviedb.org/3/discover/movie'

$(function () {
  app.init();
  // console.log('document')
})

app.init = function () {

  // FIRST CALL TO YUMMLY API
  $.ajax({
    url: app.yummlyApiUrl,
    method: 'GET',
    data: {
      format: 'jsonp',
      _app_id: app.yummlyApiID,
      _app_key: app.yummlyApiKey,
      requirePictures: true,
      maxResult: 100,
      'allowedCuisine[]': 'cuisine^cuisine-chinese',
    }
  }).then(function (result) {
    console.log(result)
    // console.log('it works')
  })

  // FIRST CALL TO MOVIE DB
  $.ajax({
    url: app.movieDBUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      api_key: app.movieDBKey,
      // query: 'rocky',
      // sort_by: “popularity.desc”

    }

  }).then((res) => {
    console.log(res)
  });

  //Get the value from the drop down on submit and then run the functions.
  const form = document.getElementById("form");

  // Object.freeze makes the object read-only, defending it from "hacky" activities. 
  // Object containing the genres for the movies.
  const genresObject = Object.freeze({
    "ACTION": 28,
    "ADVENTURE": 12,
    "ANIMATION": 16,
    "COMEDY": 35,
    "CRIME": 80,
    "DOCUMENTARY": 99,
    "DRAMA": 18,
    "FAMILY": 10751,
    "FANTASY": 14,
    "HISTORY": 36,
    "HORROR": 27,
    "MUSIC": 10402,
    "MYSTERY": 9648,
    "ROMANCE": 10749,
    "THRILLER": 53,
    "WAR": 10752,
    "WESTERN": 37,
    "SCIFI": 878,
    "TV MOVIE": 10770
  })

  form.addEventListener("submit", (e) => {
    let input = document.getElementById("inputField").value;
    let searchedFor = document.getElementById("searchedFor");

    // Clear the actor Id.
    sessionStorage.removeItem("theActorId");

    if (genresObject[input.trim().toUpperCase(input)]) {
      pageNum = 1;
      // No matter if the user types in all lower case letters, or random, it will still load the needed data.
      searchedFor.style.fontSize = "50px";
      const id = genresObject[input.trim().toUpperCase(input)];
      searchedFor.innerHTML = "Genre: " + "<span>" + input + "</span>"
      genres(id);
    }
    else if (isNaN(input)) {
      pageNum = 1;
      // If the input value is a STRING :
      searchedFor.innerHTML = "Movie title / Actor: " + "<span>" + input + "</span>"
      searchedFor.style.fontSize = "30px";
      searchMovies(input);
      discoverByActor(input).then(moviesByActor);
    } else {
      pageNum = 1;
      //Call function.
      searchedFor.style.fontSize = "50px";
      searchedFor.innerHTML = "Year: " + "<span>" + input + "</span>";
      discoverMovies(input)
    }
    e.preventDefault();
  })
  function genres(id){
    pageNum = 1;
    selectedGenres.style.display = "none";

    //Send the ID of the selected element into sessionStorage.
    sessionStorage.setItem("genre", id)

    //API request.
    axios.get("https://api.themoviedb.org/3/discover/movie?api_key="+app.movieDBKey+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres='+id)
        .then((response)=>{
            let movie = response.data.results;
            let output = "";
            for(let i = 0; i < movie.length; i++){
                let id = response.data.results[i].id;
    id = JSON.stringify(id);
    let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    if(favoriteMovies.indexOf(id) === -1){
      output += `
      <div class="card">
        <div class="overlay">
        <div class="movie">
          <h2>${movie[i].title}</h2>
            <p id="p_rating"><strong>Rating:</strong> <span>${movie[i].vote_average} / 10  </p>
            <p><strong>Release date:</strong> <span>${movie[i].release_date} </span></p>
        </div>
        </div>
        <div class="card_img">
          <img src="http://image.tmdb.org/t/p/w400/${movie[i].poster_path}" onerror="this.onerror=null;this.src='../images/imageNotFound.png';">
        </div>
      </div>
      `;
    } 
            }
            let moviesInfo = document.getElementById("movies");
            moviesInfo.innerHTML = output;

            //Display pages buttons.
            let totalPages = response.data.total_pages;
            let pages = document.querySelector(".pages");
            pages.style.display = "flex";

            if(totalPages < 2){
                pages.style.display = "none";
            } else if (pageNum === 1){
                prev.style.display = "none";
                next.style.display = "block";
            }
        })
}
}

