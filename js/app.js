(function () {

angular.module('movieApp', ['ui.router',
  'movieApp.movieControllers',
  'movieApp.movieSDirectives',
  'movieApp.ajaxService',
  'LocalStorageModule'])

.config(function($stateProvider, $urlRouterProvider){ 
  
  $stateProvider
  .state('movie', {
    abstract: true,
    views: {
      'header': {
        templateUrl: 'templates/movieHeader.html',
        controller: "MovieHeaderCtrl"
      },
      'footer@':{
        templateUrl: 'templates/movieFooter.html'
      }
    },
    resolve:{
     //get some data before it opens the page if required
    }
  })
  
  .state('movie.search', {
    url: "/search",
    views: {
      'body@': {
        templateUrl: "templates/movie.html",
        controller: "MovieSearchCtrl"
      }
    }
  })
  
  .state('movie.library', {
    url: "/library",
    views: {
      'body@': {
        templateUrl: "templates/library.html",
        controller: "MovieLibraryCtrl"
      }
    }
  })
  
  $urlRouterProvider.otherwise('/search')
  
});

}());