<?php
	header("Access-Control-Allow-Origin: *");
	$connect = mysqli_connect('localhost','root','','task_project');
	//post method
	if ($_SERVER['REQUEST_METHOD'] == "GET"){
		//action variable isset
		if (isset($_GET["action"])){
			//ACTION to be performed on the DB.
			$action = $_GET["action"]; 
			switch($action){
				case "register":
					if(isset($_GET['email']) && isset($_GET['phone'])){
						$name = $_GET['name'];
						$email = $_GET['email'];
						$phone = $_GET['phone'];
						$password = $_GET['password'];
						$result1 = mysqli_query($connect,"select * from user_details where email = '$email' OR phone = '$phone'");
						if(mysqli_num_rows($result1)>0){
							$status = "failure";
							$response = null;
							$message = "user already exists";
						}
						else{
							$result = mysqli_query($connect,"insert into user_details(name,email,phone,password,created_timestamp,status) values('$name','$email','$phone','$password',now(),'active')");
							if($result){
								$status = "success";
								$response = null;
								$message = "user created";
							}
							else{
								$status = "failure";
								$response = null;
								$message = "user not created";
							}
						}						
					}
					else{
						$status = "failure";
						$response = null;
						$message = "email and phone not set";
					}
				break;
				case "login":
					if(isset($_GET['username']) && isset($_GET['password'])){
						$username = $_GET['username'];
						$password = $_GET['password'];
						$result = mysqli_query($connect,"select * from user_details where password = '$password' AND (email = '$username' OR phone = '$username')");
						if(mysqli_num_rows($result)>0){
							while($row = mysqli_fetch_array($result)){
								$obj = array('name' => $row['name'],
												'user_id' => $row['user_id']);
							}
							$status = "success";
							$response = $obj;
							$message = "user authenticated";
						}
						else{
						$status = "failure";
						$response = null;
						$message = "user not registered";
						}
					}
					else{
						$status = "failure";
						$response = null;
						$message = "username and password not set";
					}
				break;
			}
		}
		else{
			$status = "failure";
			$response = null;
			$message = "action not set";
		}
	}
	else{
		$status = "failure";
		$response = null;
		$message = "method is not GET";
	}
	$data = array("status"=>$status, "message"=>$message, "response"=>$response);
	$data = json_encode($data);
	echo $data;
?>