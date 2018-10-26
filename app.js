var wapp = angular.module("myWApp", ["ngRoute"]);
wapp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
        controller : "londonCtrl"
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
wapp.controller("londonCtrl", function ($scope) {
    $scope.msg = "I love London";
});
wapp.controller("parisCtrl", function ($scope) {
    $scope.msg = "I love Paris";
});

wapp.factory('openweather', function($http) {
	var runRequest = function(city) {
		return $http({
			method: 'JSONP',
			url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+ city + '&mode=json&units=metric&cnt=4&callback=JSON_CALLBACK'
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