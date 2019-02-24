const app = {};

app.movieDBKey = '59be6234ea545ba637c135657e114e1d'
app.movieDBUrl = 'https://api.themoviedb.org/3/discover/movie'

$(function () {
  app.init();
})

app.formSubmit = function () {
  // every time we 'submit', run the following code:
  // prevent default
  $('form').on('submit', (event) => {
    event.preventDefault();
    console.log(event)

    // gather user choice of Movie Genre
    app.userGenre = $('#genreChoice').val()
    console.log(app.userGenre)

    // gather user choice of minimum movie release year
    app.userMinYear = $('#minYear').val()
    console.log(app.userMinYear)

    // gather user choice of maximum movie release year
    app.userMaxYear = $('#maxYear').val()
    console.log(app.userMaxYear)

    //gather user choice of movie rating
    app.userRating = $('#ratingChoice').val()
    console.log(app.userRating)

    //call getData, which is a method that makes the API call.
    app.getData();
  })
}

//method which makes the ajax call and then returns
app.getData = function () {

  // Call to The Movie Database API
  $.ajax({
    url: app.movieDBUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      api_key: app.movieDBKey,
      with_genres: app.userGenre,
      'vote_average.gte': app.userRating,
      sort_by: 'popularity.desc',
      'primary_release_date.gte': app.userMinYear,
      'primary_release_date.lte': app.userMaxYear,
    }
    // res becomes the object that carries the "result" array
  }).then((res) => {
    // get all results
    const movieResults = res.results;
    console.log(movieResults);
    // get movie genre
    // const movieGenre = movieResults.genre_ids;

    // console.log(movieGenre);

  });

}




app.init = function () {

  app.formSubmit();

}

