/**
 * Created by seanchain on 3/21/15.
 */

//angular.module('myApp', []).run(function($rootScope){
//    $rootScope.name = "World";
//});

var app = angular.module("app", []);
var app1 = angular.module("app1", []);
var mail = angular.module("mail", []);
var custom = angular.module("custom", []);
var ngattr = angular.module("ngattr", []);


app.controller('MyController', function($scope){
    $scope.name = "Ari";
});

app.controller('otherController', function($scope){
    $scope.name = "Larry";
});

app.controller('TimeController', function($scope){
    $scope.clock = {
        now : new Date()
    };
    var updateClock = function() {
        $scope.clock.now = new Date()
    };
    window.setInterval(function(){
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
});

app.controller('FirstController', function($scope){
    $scope.counter = 0;
    $scope.add = function(amount){$scope.counter += amount;};
    $scope.subtract = function(amount){$scope.counter -= amount;};
});

app.controller('PersonController', function ($scope){
    $scope.person = {
        name: "Sean Chain",
        age: 13,
        education: "college"
    };
});

app.controller('ParentController', function($scope){
    $scope.person = {greeted: false};
});

app.controller('ChildController', function($scope){
    $scope.sayHello = function(){
        $scope.person.name = "Sean Chain";
    };
});

app1.controller('ExController', function($scope, $parse){
   $scope.$watch('expr', function(newVal, oldVal, val){
      if(newVal != oldVal){
          var parseFun = $parse(newVal);
          $scope.parseValue = parseFun(val);
      }
   });
});

app1.controller('NameController', function($scope, $filter){
    $scope.name = $filter('uppercase')('Sean Chain');
});

app1.controller('TimeController', function($scope){
    var now = new Date();
    $scope.date = now;
});

app1.filter('capitalize', function(){
    return function(input){
        return input[0].toUpperCase() + input.slice(1);
    }
});

custom.directive('myDirective', function(){
   return {
       restrict: 'EAC', //调用时候E代码表元素，A代表属性，C代表类
       replace: true,
       template: '<a href="http://chensihang.com">Click to My Personal Site</a>'
   };
});

custom.directive('lnk', function(){
   return {
       restrict: 'EAC',
       replace: true,
       scope: {
           url:'@',
           text:'@'
       },
       template: '<a href="{{url}}">{{text}}</a>'
   }
});

ngattr.controller('PeopleController', function($scope){
   $scope.people = [
       {name: "Ari", city: "San Francisco"},
       {name: "Erik", city: "Seattle"}
   ];
});