const app = {};

app.yummlyApiKey = '4232b467d64427cc7880acacaa0f27bc';
app.yummlyApiUrl = 'http://api.yummly.com/v1/api/recipes?'; // http://api.yummly.com/v1/api/metadata/
app.yummlyApiID = '44d38b57';

app.movieDBKey = '59be6234ea545ba637c135657e114e1d'
app.movieDBUrl = 'https://api.themoviedb.org/3/discover/movie'

$(function () {
  app.init();
})

app.init = function () {

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
      
      'allowedCuisine[]': 'cuisine^cuisine-chinese',
    }
  }).then(function (result) {
    console.log(result)
    // console.log('it works')
  })

  // AJAX CALL TO MOVIE DB
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



  // submit form and prevent default
  $('form').on('submit', (event) => {
    event.preventDefault();

    // every time we 'submit', run the following code:

    // gather user input data by the value attribute
    let userCuisine = $('select[name=cuisine]:selected').val()
    
  })
}