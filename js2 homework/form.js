'use strict'

	var database = [{email:"123", password:"555"},{email:"144", password:"555"},{email:"188", password:"555"},{email:"135", password:"555"},{email:"198", password:"555"}]
	

	alert("Hello!")
	databaseOption()

	function databaseOption(){
		while (true){
		var chosenElement = prompt("Choose option: \na)Registration \nb)Sign in \nc)List of users \nd)Change user data \n q)Quit" , "")
		if (chosenElement === "a" || chosenElement === "Registration"  || chosenElement === "registration"){
			createNewUser()
		}
		else if (chosenElement === "b" || chosenElement === "Sign in"  || chosenElement === "sign in"){
			autorization()
		}
		else if (chosenElement === "c" || chosenElement === "List of users"  || chosenElement === "list of users"){
			userList()
		}
		else if (chosenElement === "d" || chosenElement === "Change user data"  || chosenElement === "change user data"){
			editUser()
		}
		else if (chosenElement === "q" || chosenElement === "Quit"  || chosenElement === "quit"){
			break
		}
		else {
			alert("Choose right option");
			databaseOption()
		}
		var question = confirm("Contiunue?")
		if (!question){
			break
		}
		}}
		







	function createUser(name,surname,age,email,password){
		this.name = name;
		this.surname = surname;
		this.age = age;
		this.email = email;
		this.password = password;
	}
/////////
	function createNewUser() {
	var name = prompt("____Registration____ \nEnter the name", "");
	var surname = prompt ("____Registration____ \nEnter the surname", "");
	var age = prompt ("____Registration____ \nEnter the age", "");
	var email = prompt("____Registration____ \nEnter the email", "");
	while (database.find(function(user){return user.email === email})){
		alert("User with this email has already created. Try another email")
		var email = prompt("Enter the email", "");
	}		
	var password = prompt("____Registration____ \nEnter the password", "");
	var user = new createUser(name,surname,age,email,password);
	database.push(user);

	console.log("New user added.\n name: "+ name +"\n surname: " + surname);
	return}
	


///////////	
	function autorization(){
		var email = prompt("____Autorization____ \nEnter the email", "");		
		var objectIndex = database.findIndex(function(user) {
 	 		return user.email === email;
		})


		while(objectIndex == -1){
			alert("____Autorization____ \nTry another email");
			var email = prompt("____Autorization____ \nEnter the email", "");
			var objectIndex = database.findIndex(function(user) {
 	 		return user.email === email;
		})
		}
		var password = prompt("____Autorization____ \nEnter the password", "");
		while(database[objectIndex].password !== password){
			alert("____Autorization____ \nIncorrect password")
			var password = prompt("____Autorization____ \nEnter the password", "");
		}
		
		for (var key in database[objectIndex] ) {
			console.log(key + " " + database[objectIndex][key])}
			
	}
////////
	function userList(){
		for(var i = 0; i<database.length; i++){
			for(var key in database[i]){
				console.log(key + ":  "+ database[i][key]);
			}
			console.log("________________");
		}
	}
//////////
	function editUser(){
		var email = prompt("____Edit User____ \nEnter the email", "");		
		var objectIndex = database.findIndex(function(user) {
 	 		return user.email === email;
		})
		console.log(objectIndex)

		while(objectIndex == -1){
			alert("____Autorization____ \nTry another email");
			var email = prompt("____Edit user____ \nEnter the email", "");
			var objectIndex = database.findIndex(function(user) {
 	 		return user.email === email;
		})
		}
		changeData()
		function changeData(){
		while(true){
		var option = prompt("_____Edit user____ \nWhat are you want to edit? \na)Name \nb)Surname \nc)Age \nd)Email \ne)Password \nf)Exit", "")
			if(option === "a"|| option ==="Name"|| option ==="name"){
				database[objectIndex].name = prompt("____Edit user____\n Enter new name","");
			}
			else if(option === "b" || option === "Surname" || option === "surname"){
				database[objectIndex].surname = prompt("Enter new surname", "");
			}
			else if( option === "c" || option ==="Age" || option ==="age"){
				database[objectIndex].age = prompt("Enter new age", "");
			}
			else if ( option === "d" || option === "Email" || option === "email"){
				database[objectIndex].email = prompt("Enter new email", "");
			}
			else if ( option === "e" || option === "Password" || option === "password"){
				database[objectIndex].password = prompt("Enter new password", "");
			}

			else if ( option === "f" || option === "Exit" || option === "exit"){
				break
			}
			else{
				alert("Choose following option");
				changeData();}

			var result = confirm("Contiunue?")
				if (!result){break}
			}
		}
		return
	}
		

