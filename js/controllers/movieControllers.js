(function () {

angular.module('movieApp.movieControllers', [])
   
.controller('MovieHeaderCtrl', function($scope, $state) {
  $scope.goToPage = function(page){
    $state.go(page);
  }
})
.controller('MovieSearchCtrl', function($scope) {
  $scope.selectedMovie = {};
})

.controller('MovieLibraryCtrl', function($scope, localStorageService) {
  var movies = localStorageService.get("lib");
  $scope.localMovies = movies == null ? [] : movies;
  $scope.genres = ["Dont have time to add unique filter"];

})


}());