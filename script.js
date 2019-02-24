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

    // gather user choice of Movie Genre
    app.userGenre = $('#genreChoice').val()
    console.log(app.userGenre)

    // gather user choice of movie year
    app.userDecade = $('#decadeChoice').val()
    console.log(app.userDecade)

    //gather user choice of movie rating
    app.userRating = $('#ratingChoice').val()
    console.log(app.userRating)

    //call getData, which is a method that makes the API call.
    app.getData();
  })
}

//method which makes the ajax call and then returns
app.getData = function () {

  // AJAX CALL TO MOVIE DB
  $.ajax({
    url: app.movieDBUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      api_key: app.movieDBKey,
      sort_by: 'popularity.desc',
      'primary_release_date.gte': 1998,
      'primary_release_date.lte': 2004,
    }
  }).then((res) => {
    console.log(res.results)
  });
}












app.init = function () {

  app.formSubmit();

}




