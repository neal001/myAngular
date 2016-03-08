var app = angular.module('myApp', []);


var apiKey = 'MDIzMDk0NzE0MDE0NTc0MTQ0OTcwYzk3Mg000',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';
 

app.directive('nprLink', function() {
   return {
     restrict: 'EA',
     require: ['^ngModel'],
     replace: true,
     scope: {
       ngModel: '=',
       play: '&'
     },
     templateUrl: '/views/nprListItem.html',
     link: function(scope, ele, attr) {
       scope.duration = scope.ngModel.audio[0].duration.$text;
     }
   } 
});


app.controller('PlayerController', function($scope, $http) {
  
var audio = document.createElement('audio');
  $scope.audio = audio;

  // audio.src = 'http://pd.npr.org/npr-mp4/npr/sf/2013/07/20130726_sf_05.mp4?orgId=1&topicId=1032&ft=3&f=61';
  // audio.play();

  $scope.play = function(program) {
    if ($scope.playing) audio.pause();
    var url = program.audio[0].format.mp4.$text;
    audio.src = url;
    audio.play();
    // Store the state of the player as playing
    $scope.playing = true;
  }


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



