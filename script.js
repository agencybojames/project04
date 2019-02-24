const app = {};

app.yummlyApiKey = '4232b467d64427cc7880acacaa0f27bc';
app.yummlyApiUrl = 'http://api.yummly.com/v1/api/recipes?'; // http://api.yummly.com/v1/api/metadata/
app.yummlyApiID = '44d38b57';

app.movieDBKey = '59be6234ea545ba637c135657e114e1d'
app.movieDBUrl = 'https://api.themoviedb.org/3/discover/movie'

$(function () {
  app.init();
})

app.formSubmit = function () {
  // submit form and prevent default
  $('form').on('submit', (event) => {
    event.preventDefault();

    // every time we 'submit', run the following code:
    // gather user choice of cuisine
    app.userCuisine = $('#cuisineChoice').val()
    console.log(app.userCuisine)

    // gather user choice of flavour
    app.userDiet = $('#dietChoice').val()
    console.log(app.userDiet)

    // gather user choice of cookTime
    app.userCookTime = $('#timeChoice').val()
    console.log(app.userCookTime)

    // gather user choice of Movie Genre
    app.userGenre = $('#genreChoice').val()
    console.log(app.userGenre)

    // gather user choice of movie year
    app.userDecade = $('#decadeChoice').val()
    console.log(app.userDecade)

    //gather user choice of movie rating
    app.userRating = $('#ratingChoice').val()
    console.log(app.userRating)

    app.getData();
  })
}


const matchesArray = function(array){

array.forEach(recipe => {
  app.recipeId = recipe.id
  // console.log(app.recipeId)
})
}

app.getData = function () {
  // AJAX CALL TO YUMMLY API
  $.ajax({
    url: app.yummlyApiUrl,
    method: 'GET',
    data: {
      format: 'jsonp',
      _app_id: app.yummlyApiID,
      _app_key: app.yummlyApiKey,
      requirePictures: true,
      maxResult: 100,
      'allowedCuisine[]': `cuisine^cuisine-${app.userCuisine}`,
      'allowedDiet[]': app.userDiet,
      'maxTotalTimeInSeconds': app.userCookTime
    }
  }).then(function (result) {
    // console.log(result)
    matchesArray(result.matches);

  })

  $.ajax({
    url: `http://api.yummly.com/v1/api/recipe/${app.recipeId}?_app_id=${app.yummlyApiID}&_app_key=${app.yummlyApiKey}`,
    method: 'GET'
  }).then(function(yup) {
    console.log(yup)
  }) 

  // AJAX CALL TO MOVIE DB
//   $.ajax({
//     url: app.movieDBUrl,
//     method: 'GET',
//     dataType: 'json',
//     data: {
//       api_key: app.movieDBKey,
//       // query: 'rocky',
//       // sort_by: “popularity.desc”
//     }
//   }).then((res) => {
//     // console.log(res.results)
//   });
}

app.init = function () {

  app.formSubmit();

}




