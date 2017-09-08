angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

 .factory('LoginService', ['$http', '$q', function($http, $q) {
	return {
			register : function(data){
				var deferred = $q.defer();
                var promise = deferred.promise;
                var name = data.name;
                var email = data.email;
                var phone = data.phone;
                var password = data.password;
                console.dir(data);

                $http({
                    method: 'GET',
                    url: 'http://localhost/demo_app_apis.php?action=register&name='+name+'&email='+email+'&phone='+phone+'&password='+password
                }).success(function(data) {
                    deferred.resolve(data);
                }).error(function(data) {
                    deferred.reject("Please try again later.");
                });
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                }
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return promise;
            
			},
			login : function(data){
				var deferred = $q.defer();
                var promise = deferred.promise;
                var username = data.username;
                var password = data.password;
                console.dir(data);

                $http({
                    method: 'GET',
                    url: 'http://localhost/demo_app_apis.php?action=login&username='+username+'&password='+password
                }).success(function(data) {
                    deferred.resolve(data);
                }).error(function(data) {
                    deferred.reject("Please try again later.");
                });
                promise.success = function(fn) {
                    promise.then(fn);
                    return promise;
                }
                promise.error = function(fn) {
                    promise.then(null, fn);
                    return promise;
                }
                return promise;	
			}
	}

}])

.service('BlankService', [function(){

}]);