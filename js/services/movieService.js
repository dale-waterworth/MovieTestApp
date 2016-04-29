(function () {
  
angular.module('movieApp.movieService', [])
.factory('MovieService', function($http, localStorageService) {
    var _movies = [];
    
    var movie = {
      getMovies: function(){
        return _movies;
      }, 
      addMovies: function(movies){
        _movies.push(movies);
      }
    }
      
    return movie;
});

}());