var app = angular.module('myApp', []);
app.run(function($rootScope) {
  $rootScope.name = "Ari Lerner";
});

app.controller('MyController', function($scope) {
  $scope.person = {
    name: ""
  };
});

app.controller('MyController', function($scope) {
  $scope.person = { name: "Ari Lerner" };
  var updateClock = function() {
    $scope.time = new Date();
  };
  var timer = setInterval(function() {
    $scope.$apply(updateClock);
  }, 1000);
  updateClock();
});

app.controller('DemoController', function($scope) {
  $scope.counter = 0;
  $scope.add = function(amount) { $scope.counter += amount; };
  $scope.subtract = function(amount) { $scope.counter -= amount; };
});

var apiKey = 'MDIzMDk0NzE0MDE0NTc0MTQ0OTcwYzk3Mg000',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';
 
app.controller('PlayerController', function($scope, $http) {
  
// Hidden our previous section's content
  
// construct our http request
  $http({
    method: 'JSONP',
    url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
  }).success(function(data, status) {
    $scope.programs = data.list.story;
// Now we have a list of the stories (data.list.story)
    
// in the data object that the NPR API 
    
// returns in JSON that looks like:
    
// data: { "list": {
    
//   "title": ...
    
//   "story": [
    
//     { "id": ...
    
//       "title": ...
  }).error(function(data, status) {
    
// Some error occurred
  });
});
