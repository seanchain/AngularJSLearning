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
var dir = angular.module("dir", []);


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
ngattr.controller('EquationController', function ($scope) {
    $scope.equation = {};
    $scope.change = function(){
        $scope.equation.output = parseInt($scope.equation.x) + 2;
    };
});

ngattr.controller('FormController', function($scope){
    $scope.fields = [
        {placeholder:'username', isRequired:true},
        {placeholder:'password', isRequired:true},
        {placeholder:'email', isRequired:false}
    ];
    $scope.submitForm = function(){
        alert('It works');
    };

});

ngattr.controller('CityController', function($scope){
   $scope.cities = [
       {name:'Seattle'},
       {name:'San Francisco'},
       {name:'Chicago'},
       {name:'Boston'}
   ];
});

ngattr.controller('LotteryController', function($scope){
   $scope.generateNumber = function(){
       return Math.floor(Math.random()*10 + 1);
   };
});


custom.directive('myDirective', function(){
    return {
        restrict: 'EAC', //调用时候E代码表元素，A代表属性，C代表类
        replace: true,
        template: '<a href="http://chensihang.com">Click to My Personal Site</a>'
    };
});



dir.directive('myDirective', function(){
    return {
        restrict: 'EAC', //restrict是一个可选的参数，提供这个指令在DOM中以何种形式来进行声明，默认为A
        //restrict可选值有EACM,分别为元素，属性，类名和注释
        template:'<div>' +
        '<a href="http://www.chensihang.com">Click Me!!!{{myUrl}}</a>' +
        '</div>',//可以使用字符串或者函数，必须设置为一段HTML文本或者一个可以接受两个参数的函数，并能够返回一个代表模板的字符串
        replace:true, //替换tag为模板内容
        //scope的值默认为false，可选值有true,false和{}，其中true表示会从父作用域集成一个新的作用域对象，而为空则指令的
        //模板就无法访问指令外部的作用域了，但是scope可以进行绑定策略的执行
        //本地作用域属性:@符号将本地作用域的值同DOM属性进行绑定
        //双向绑定：=符号将本地作用域的属性同父级作用域上的属性进行双向的数据绑定
        //父级作用域绑定：&符号可以对于父级作用域进行绑定，以便在其中运行函数
        scope: {
            myUrl: '@'
        }
    };
});

dir.directive('sidebox', function() {
   return {
       restrict: 'EA',
       scope:{
           title : '@'
       },
       transclude:true, //transclude默认为false，设置为true之后可以创建可复用的组件，也就是在你的directive标签里面添加其他内容，
       template:'<div class="sidebox"><div class="panel"><h2 class="subheader">{{title}}</h2><span class="content" ' +
       'ng-transclude>' +
       '</span></div></div>'
   }
});