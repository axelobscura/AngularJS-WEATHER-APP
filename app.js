var wapp = angular.module("myWApp", ["ngRoute"]);
wapp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
        controller : "mainCtrl"
    })
    .when("/london", {
        templateUrl : "london.htm",
        controller : "londonCtrl"
    })
    .when("/paris", {
        templateUrl : "paris.htm",
        controller : "parisCtrl"
    });
});
wapp.controller("mainCtrl", function ($scope, $http) {
  $scope.Mahesh = {};
  $scope.Mahesh.city = "Mahesh Parashar";
  $scope.Mahesh.rollno  = 1;

  
});


wapp.factory('openweather', function($http) {
	var runRequest = function(city) {
		return $http({
			method: 'JSONP',
			url: 'https://www.metaweather.com/api/location/44418/'
		});
	};
	return {
		event: function(city) {
			return runRequest(city);
		}
	};
})

wapp.controller('WeatherForecastCtrl', function($scope, $timeout, openweather){
	var timeout;		
	$scope.$watch('city', function(newCity) {
		if(newCity) {
			if(timeout) $timeout.cancel(timeout);
			timeout = $timeout(function() {
				openweather.event(newCity).success(function(data, status)	{	
					$scope.loc = data;
					$scope.forecast = data.list;
				});
			}, 1000);
		}
	});
});
/*
wapp.directive('weather', function() {
  var directive = {};
  directive.restrict = 'E';
  directive.template = "Student: <b>{{weather.city}}</b> , Roll No: <b>{{weather.rollno}}</b>";
  
  directive.scope = {
    weather : "=city"
  }
  
  directive.compile = function(element, attributes) {
     element.css("border", "1px solid #cccccc");
     
     var linkFunction = function($scope, element, attributes) {
        element.html("Student: <b>"+$scope.weather.city +"</b> , Roll No: <b>"+$scope.weather.rollno+"</b><br/>");
        element.css("background-color", "#ff00ff");
     }
     return linkFunction;
  }
  
  return directive;
});
*/
wapp.directive('weather', ['$http', function($http) {
  return {
      restrict: 'E',
      template: "Student",
      transclude: true,
      replace: true,     
      scope:{
          src:"="       
      },
      controller:function($scope, element){
        $scope.gallery = [];
        console.log("elrsc: " + $scope.src);
  
        $http({method: 'GET', url:'https://www.metaweather.com/api/location/2344116/'}).then(function (response) {
          console.log("respuesta" + response.data.consolidated_weather);
          $scope.istambulData = response.data.consolidated_weather;            
        }, function (result) {
          alert("Error: No data returned");
        });
      }
  }
}]);