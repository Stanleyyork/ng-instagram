var app = angular.module('instagramSearchApp', ['ngRoute', 'ngResource']);

var parseRequestHeaders = {
  'X-Parse-Application-Id': 'aVXrTmJT0WVLmOwoMWCltmiz4OGrBKWG88eFPTVy',
  'X-Parse-REST-API-Key': 'TuiaKyAErB9rD7PjNoIbHVxC0UBqH6dIYAvkt30d'
};

app.factory('Photo', ['$resource', function ($resource) {
  return $resource('https://api.parse.com/1/classes/Photo/:photoId', { photoId: '@photoId' },
    {
      query: {
        method: 'GET',
        isArray: false,
        headers: parseRequestHeaders
      },
      save: {
        method: 'POST',
        headers: parseRequestHeaders
      }
    });
}]);

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

app.controller('SearchCtrl', ['$scope', '$http', 'Photo', function ($scope, $http, Photo) {
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

  $scope.savePhoto = function (photo) {
  var photoData = {
    url: photo.images.standard_resolution.url,
    user: photo.user.username,
    likes: photo.likes.count
  };

  Photo.save(photoData, function (data) {
    // success callback
  }, function (error) {
    // error callback
  });

  // or without callbacks:
  // Photo.save(photoData);
};
}]);

app.controller('FavoritesCtrl', ['$scope', 'Photo', function ($scope, Photo) {
  $scope.favorites = [];

  Photo.query(function (data) {
    // success callback
    $scope.favorites = data.results;
  }, function (error) {
    // error callback
  });
}]);