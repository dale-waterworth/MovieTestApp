(function () {
	
angular.module('movieApp.ajaxService', [])

.factory('AJAX', ['$http', function($http) {
	var domain = "http://www.omdbapi.com" 
	  
	var ajax = {
  	get: function(data, success, fail, after){
  	  console.log("sending", data);
      $http({
            url: domain,
            method: "GET",
            headers: {
              "Content-type": "application/x-www-form-urlencoded"
            },
            params: data
        }).
        then(success, fail)
        .finally(after);
  	}
	}
  
	return ajax;
	
}]);
	
}());