
/*FIRST EXAMPLE
const person = {firstName:"John", lastName:"Doe", age:50,eyeColor:"blue"};
document.getElementById("demo").innerHTML =
person.firstName + " is " + person.age + " years old.";*/

/*This example creates an empty JavaScript object, and then adds 4 properties:
const person = {};
person.firstName = "John";
person.lastName = "Doe";
person.age = 50;
person.eyeColor = "blue"; 
*/

/* The following example create a new JavaScript object using new Object(), and then adds 4 properties:
const person = new Object();
person.firstName = "John";
person.lastName = "Doe";
person.age = 50;
person.eyeColor = "blue"; 

There is no need to use new Object().
For readability, simplicity and execution speed, use the object literal method.
*/

/*JavaScript for...in Loop
The JavaScript for...in statement loops through the properties of an object.
Syntax
for (let variable in object) {
  // code to be executed
}
The block of code inside of the for...in loop will be executed once for each property. */

/*
const person = {
    fname:"John",
    lname:"Doe",
    age:25
  }; 
  
  let txt = "";
  for (let x in person) {
    txt += person[x] + " ";
  }
  
  document.getElementById("demo").innerHTML = txt;
*/

/*Nested Arrays and Objects
Values in objects can be arrays, and values in arrays can be objects:

Example
let x = "";
const myObj = {
  name: "John",
  age: 30,
  cars: [
    {name:"Ford", models:["Fiesta", "Focus", "Mustang"]},
    {name:"BMW", models:["320", "X3", "X5"]},
    {name:"Fiat", models:["500", "Panda"]}
  ]
}

for (let i in myObj.cars) {
  x += "<h2>" + myObj.cars[i].name + "</h2>";
  for (let j in myObj.cars[i].models) {
    x += myObj.cars[i].models[j] + "<br>";
  }
}

document.getElementById("demo").innerHTML = x;
*/

/*Accessing Object Methods
You access an object method with the following syntax:
objectName.methodName()
You will typically describe fullName() as a method of the person object, and fullName as a property.
The fullName property will execute (as a function) when it is invoked with ().
This example accesses the fullName() method of a person object:
*/
const person = {
    firstName: "John",
    lastName: "Doe",
    id: 5566,
    fullName: function() {
      return this.firstName + " " + this.lastName;
    }
  };
  
  document.getElementById("demo").innerHTML = person.fullName();