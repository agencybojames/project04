<<<<<<< HEAD
const app = {};
app.yummlyApiKey = '8e9501ed6ce9a437dced0f55150d990d';
app.yummlyApiUrl = 'http://api.yummly.com/v1/api/recipes?';

$(function () {
  app.init();
})

app.init = function(){
  $.ajax({
    url: app.yummlyApiUrl,
    method: 'GET',
    dataType: 'json',
    data: {
      key: app.yummlyApiKey,
      // id: '44d38b57',
      format: 'json',
    }
  }).then(function(result) {
    console.log(result)
  })
=======
const movieApp = {};

movieApp.apiKey = '59be6234ea545ba637c135657e114e1d';
movieApp.apiURL = 'https://api.themoviedb.org/3/movie/popular';

movieApp.init= () => {
movieApp.getMovies();
}


movieApp.getMovies = () => {
    $.ajax({
        url: movieApp.apiURL,
        method:'GET',
        dataType: 'jsonp',
        data: {
            key: movieApp.apiKey 
        }
    }).then((result) => {
        console.log('test')
    });
>>>>>>> jamesbranch
}
