angular.module('app.controllers', [])
  
.controller('loginCtrl', function ($scope, $stateParams,LoginService,$ionicPopup,$state) {
	$scope.login = function(username,password){
		//alert("inside login controller");
		$scope.user = {username : username, password : password};
		LoginService.login($scope.user).then(function(data){
			console.log(data);
			if(data.status == 'success'){
				var alertPopup = $ionicPopup.alert({
                                    title: 'Success',
                                    template: 'User Authenticated'
                                });
                                alertPopup.then(function(res) {
                                    console.log('Clicked on Popup "OK" ');
                                });
			}
			else{
				var alertPopup = $ionicPopup.alert({
                                    title: 'Failure',
                                    template: 'User not Authenticated'
                                });
                                alertPopup.then(function(res) {
                                    console.log('Clicked on Popup "OK" ');
                                });
			}
		})
	}

})
   
.controller('signupCtrl', function ($scope, $stateParams,LoginService,$ionicPopup,$state) {
$scope.signUp = function(name,email,phone,password,confirmPassword){
	//alert("inside sign up controller");
	$scope.user = {name : name,
	 				email : email,
	 				phone : phone,
	 				password : password
	 			};
	console.log($scope.user);
	if(password != confirmPassword){
		var alertPopup = $ionicPopup.alert({
                                    title: 'Failure',
                                    template: 'Passwords dont match'
                                });
                                alertPopup.then(function(res) {
                                    console.log('Clicked on Popup "OK" ');
                                });
		//alert("passwords dont match");
	}
	else{
		LoginService.register($scope.user).then(function(data){
			console.log(data);
			if(data.status == 'success'){
				var alertPopup = $ionicPopup.alert({
	                                    title: 'Success',
	                                    template: 'user created'
	                                });
	                                alertPopup.then(function(res) {
	                                    console.log('Clicked on Popup "OK" ');
	                                });
	            $state.go('login');                    
	        }
		});
	}

}

})
 