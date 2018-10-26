var wapp = angular.module("myWApp", ["ngRoute"]);
wapp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html"
    })
    .when("/london", {
        templateUrl : "london.htm",
    })
    .when("/paris", {
        templateUrl : "paris.htm",
    });
});

wapp.directive('weather', ['$http', function($http) {
  return {
    restrict: 'AE',

    template: `
        <ul>
            <li ng-repeat="istambul in data | limitTo : 1">
              <p><b>DATE: {{ istambul.applicable_date + ', ' + istambul.applicable_date }}</b></p>
              <p>WEATHER STATE: {{ istambul.weather_state_name + ', ' + istambul.weather_state_abbr }}</p>
              <p>TEMPERATURE: {{ istambul.the_temp }}</p>
              <p>HUMIDITY: {{ istambul.humidity }}</p>
            </li>
          </ul>
    `, //prints the data
    scope: {
      category: '@category',
      weather : "=city"
    },
    controller: function($scope, $attrs) {
      $scope.data;
      $http({
        method: 'GET',
        url: 'https://www.metaweather.com/api/location/' + $scope.weather
      }).then(function(result) {
          $scope.data = result.data.consolidated_weather;
      }, function(result) {
        alert("Error: No data returned");
      });
    }
  };
}]);