var app = angular.module('instagramSearchApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/search.html',
      controller: 'SearchCtrl'
    })
    .when('/favorites', {
      templateUrl: 'templates/favorites.html',
      controller: 'FavoritesCtrl'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

app.controller('SearchCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.test = "Hello world - Search";
  $scope.searchTag = function () {
    var tag = $scope.tag;
    var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';

    $http.jsonp(url)
      .then(function (response) {
        // success callback
        console.log(response);
        $scope.photos = response.data.data;
        $scope.tag = "";
      }, function (error) {
        // error callback
        console.log(error);
      });
  };
}]);

app.controller('FavoritesCtrl', ['$scope', function ($scope) {
	$scope.test = "Hello world - Favorites";
}]);