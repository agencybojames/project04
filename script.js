const app = {};

app.yummlyApiKey = '4232b467d64427cc7880acacaa0f27bc';
app.yummlyApiUrl = 'http://api.yummly.com/v1/api/recipes?';
app.yummlyApiID = '44d38b57';

app.init = function(){
  $.ajax({
    url: app.yummlyApiUrl,
    method: 'GET',
    data: {
      format: 'json',
      _app_id: app.yummlyApiID,
      _app_key: app.yummlyApiKey,
    }
  }).then(function(result) {
    console.log(result)
    // console.log('it works')
  })
}

const movieApp = {};


$(function () {
  app.init();
  console.log('document')
})


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
}
