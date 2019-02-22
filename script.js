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
}
