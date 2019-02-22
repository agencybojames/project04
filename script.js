const app = {};

app.yummlyApiKey = '4232b467d64427cc7880acacaa0f27bc';
app.yummlyApiUrl = 'http://api.yummly.com/v1/api/recipes?';
app.yummlyApiID = '44d38b57';

app.movieDBKey = '59be6234ea545ba637c135657e114e1d'
app.movieDBUrl = 'https://api.themoviedb.org/3/search/movie'

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
      format: 'json',
      _app_id: app.yummlyApiID,
      _app_key: app.yummlyApiKey,
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
      query: 'rocky',
      // sort_by: “popularity.desc”
    }
    }).then((res) => {
      console.log(res)
    });
}