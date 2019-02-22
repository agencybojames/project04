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
}
