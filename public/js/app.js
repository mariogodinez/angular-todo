
	var app = angular.module('myApp', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider){
		$routeProvider

			.when('/', {
					templateUrl : 'views/app.html',
					controller: 'AppController',
				})
			.when('/contact', {
				templateUrl : 'views/contact.html',
				controller: 'ContactController',
			})
			.when('/we', {
				templateUrl : 'views/we.html',
				controller: 'WeController',
			})

	}])

	app.controller('ContactController', function($scope){
		$scope.count = 1;
	})


	app.controller('WeController', function($scope){
		$scope.counter = 100;
	})




	app.controller('AppController', function($scope, $http){
		$scope.formData = {};
		$http.get('/api/todos')
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})

			.error(function(data){
				console.log('ERROR: ' + data)
			});

		$scope.createTodo = function(){
			$http.post('/api/todos', $scope.formData)
				.success(function(data){
					$scope.formData = {};
					$scope.todos = data;
					console.log(data);
				})
				.error(function(data){
					console.log('ERROR: ' + data)
				})
		}

		$scope.deleteTodo = function(id){
			$http.delete('/api/todos/' + id)
				.success(function(data){
					$scope.todos = data;
					console.log(data)
				})
				.error(function(data){
					console.log('ERROR: ' + data)
				})
		}


	})





