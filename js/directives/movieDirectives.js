(function () {
 angular.module('movieApp.movieSDirectives', [])
 
  .directive('movieSearch', function(AJAX) {
      return {
          restrict: 'EA',
          scope: {
            selectedMovie: "="
          },
          templateUrl: '/templates/directives/movieSearch.html',
          link: function (scope, element, attrs) {
            scope.movie = {};
            scope.suggestedTitle = "";
            var callingServer = false;
            
            //prevent defautl tab behaviour
             element.bind("keydown keypress", function (event) {
                if(event.which === 9) {
                    event.preventDefault();
                    // Go to next age input                        
                }
            });
            
            //build the url to get movie listing
            function buildUrl(searchTerm){
               return {
                  s: searchTerm,
                  r: "json"
              }
            }

            
            scope.keyPress = function(event){
              //tab or right key pressed
              if(scope.movie.listings && scope.movie.listings.length > 0) {
                if(event.keyCode == 39 || event.keyCode == 9){
                  scope.movie.searchTerm = scope.movie.listings[0].Title;
                  scope.selectedMovie = scope.movie.listings[0];
                  console.log(scope.selectedMovie);
                  scope.hideResulst = true;
                }
              }
            }
            
            var success = function(respsonse){
              console.log("returned from get request", respsonse);
              if(respsonse.data.Response == "True"){
                console.log("add to list", respsonse.data.Search);
                scope.movie.listings = respsonse.data.Search;
                scope.movie.listings[0].first = true;
              } else {
                scope.movie.listings = ["No results"];
              }
            }
            var fail = function(respsonse){
              console.log("returned from fail get request", respsonse);
              
            }
            var after = function(){
              console.log("request finished");
              callingServer = false;
            }
            
            
            //make requist
            function callServer(searchTerm){
              callingServer = true;
              AJAX.get(buildUrl(searchTerm), success, fail, after);
            }
            
            
            /**
             * Handle the search
             */
            scope.searchMovie = function(){
              console.log(scope.movie);
              //maker sure search term is greater than 1 and it's not already searching
              if(scope.movie.searchTerm.length > 1 && !callingServer){
                callServer(scope.movie.searchTerm);
              } else {
                scope.movie.listings = [];
              }
            }
            
         }
      }
  }) 
  
  .directive('library', function(AJAX, localStorageService) {
      return {
          restrict: 'EA',
          scope: {
            localMovies: "=",
            foundMovie: "="
          },
          templateUrl: '/templates/directives/library.html',
          link: function (scope, element, attrs) {
            scope.searchTerm = "";
            
            scope.saveMovie = function(movieObj){
              scope.localMovies.push(movieObj);
              //should do a watch on localMovies
              localStorageService.set("lib", scope.localMovies);
            }
            var success = function(respsonse){
              console.log("returned from get request", respsonse);
              if(respsonse.data.Response == "True"){
                scope.saveMovie(respsonse.data);
                scope.foundMovie = respsonse.data;
              }
            }
            var fail = function(respsonse){
              console.log("returned from fail get request", respsonse);
              
            }
            var after = function(){
              console.log("request finished");
              callingServer = false;
            }
            
            scope.searchMovie = function(){
              console.log("here", scope.searchTerm);
              if(scope.searchTerm != ""){
                var movie = localSearch(scope.searchTerm);
                if(movie == null){
                  AJAX.get(buildUrl(scope.searchTerm), success, fail, after);
                } else {
                  //found locally
                  scope.foundMovie = movie;
                }
              }
            }
            
            scope.updateMovie = function(movie){
              console.log("saving", movie);
              updateMovie(movie)
            }
            function updateMovie(title){
              angular.forEach(scope.localMovies, function(movie){
                if(m.imdbID == movie.imdbID){
                  console.log("saving to local")
                  movie = m;
                  localStorageService.set("lib", scope.localMovies);
                }
              });
            }
            function getMovie(title){
              for(var i = 0; i < scope.localMovies.length; i++){
                console.log(title.toUpperCase(), scope.localMovies[i].Title.toUpperCase())
                if(title.toUpperCase() == scope.localMovies[i].Title.toUpperCase()){
                  return scope.localMovies[i];
                }
              };
              return null;
            }
            
            function localSearch(searchTerm) {
              var movie = getMovie(searchTerm);
              console.log("movie found", movie);
              return movie;
            }
            
            function buildUrl(searchTerm){
               return {
                  t: searchTerm,
                  r: "json"
              }
            }
            
           
            
            
          }
      }
  })
  
  
}());