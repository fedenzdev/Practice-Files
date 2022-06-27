
const person = {firstName:"John", lastName:"Doe", age:50,eyeColor:"blue"};

document.getElementById("demo").innerHTML =
person.firstName + " is " + person.age + " years old.";

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

