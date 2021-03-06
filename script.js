//create an object called app which will store everything.
const app = {};

//create properties on app which will hold the api key and api url strings
app.movieDBKey = '59be6234ea545ba637c135657e114e1d'
app.movieDBUrl = 'https://api.themoviedb.org/3/discover/movie'
app.posterUrl = 'http://image.tmdb.org/t/p/w500'

//call document ready which calls app.init 
$(function () {
  app.init();
})

//app.init calls app.userInput()
app.init = function () {
  app.userInput();
}

//when userInput is called, it runs the following;
app.userInput = function () {

  //grab the form, and on submit, do the following:
  $('form').on('submit', (event) => {
    $('div').empty(),

      //whatever the event of submit is, prevent the default behaviour of it.
      event.preventDefault();

    //store the value of the selected genre and store it in a variable called userGenre
    userGenre = $('#genreChoice').val()

    // gather user choice of minimum movie release year
    userMinYear = $('#minYear').val()

    // gather user choice of maximum movie release year
    userMaxYear = $('#maxYear').val()

    //gather user choice of movie rating
    userRating = $('#ratingChoice').val()

    //call getMovies, which is a method that makes the API call.
    app.getMovies();
  })
}

//method which makes the ajax call and then returns
app.getMovies = function () {

  // Call to The Movie Database API
  $.ajax({
    url: app.movieDBUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      api_key: app.movieDBKey,
      with_genres: userGenre,
      'vote_average.gte': userRating,
      sort_by: 'popularity.desc',
      'vote_count.gte': 100,
      'primary_release_date.gte': userMinYear,
      'primary_release_date.lte': userMaxYear,
    }
    // res becomes the object that carries the "result" array
  }).then((res) => {
    app.showMovies(res.results)
    // console.log(res.results)
  });

  //the app.showMovies function, when called, does the following;
  app.showMovies = function (movies) {

    // create a variable called moviesFinal which takes only the first 3 objects from the movies array and stores them.
    let moviesFinal = movies.slice(1, 4)


    moviesFinal.forEach(function (movie) {
      $('div.poster').addClass('center').append(`<img src="${app.posterUrl}${movie.poster_path}">`);
      $('div.poster').addClass('center').append(`<h2>Title: ${movie.title}</h2>`);
      $('div.poster').append(`<h2>Release Date: ${movie.release_date}</h2>`);
      $('div.poster').append(`<h2>Rating: ${movie.vote_average}/10</h2>`);
      $('div.poster').append(`<h2>Synopsis </h2><p>${movie.overview}</p>`);
    })
  }
}