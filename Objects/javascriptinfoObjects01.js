            Objects
An empty object (“empty cabinet”) can be created using one of two syntaxes:
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax

            Literals and properties
We can immediately put some properties into {...} as “key: value” pairs:
let user = {     // an object
    name: "John",  // by key "name" store value "John"
    age: 30        // by key "age" store value 30
};
A property has a key (also known as “name” or “identifier”) before the colon ":" and a value to the right of it.
Property values are accessible using the dot notation:
// get property values of the object:
alert( user.name ); // John
alert( user.age ); // 30
The value can be of any type. Let’s add a boolean one:
user.isAdmin = true;
To remove a property, we can use the delete operator:
delete user.age;
We can also use multiword property names, but then they must be quoted:
let user = {
    name: "John",
    age: 30,
    "likes birds": true  // multiword property name must be quoted
  };
The last property in the list may end with a comma:
let user = {
  name: "John",
  age: 30,
}
That is called a “trailing” or “hanging” comma. Makes it easier to add/remove/move around
properties, because all lines become alike.

            Square brackets
For multiword properties, the dot access doesn’t work:
user.likes birds = true  // this would give a syntax error
There’s an alternative “square bracket notation” that works with any string:
let user = {};
user["likes birds"] = true; // set
alert(user["likes birds"]); // get
delete user["likes birds"]; // delete
Now everything is fine. Please note that the string inside the brackets is properly quoted 
(any type of quotes will do).
Square brackets also provide a way to obtain the property name as the result of any expression – as opposed
to a literal string – like from a variable as follows:
let key = "likes birds";
user[key] = true; // same as user["likes birds"] = true;
Here, the variable key may be calculated at run-time or depend on the user input. And then we use it to
access the property. That gives us a great deal of flexibility.
For instance:
let user = {
  name: "John",
  age: 30
};
let key = prompt("What do you want to know about the user?", "name");
// access by variable
alert( user[key] ); // John (if enter "name")
The dot notation cannot be used in a similar way:
let user = {
  name: "John",
  age: 30
};
let key = "name";
alert( user.key ) // undefined


            Computed properties
We can use square brackets in an object literal, when creating an object. That’s called computed properties.
For instance:
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
};
alert( bag.apple ); // 5 if fruit="apple"
The meaning of a computed property is simple: [fruit] means that the property name should be taken from fruit.
So, if a visitor enters "apple", bag will become {apple: 5}.
Essentially, that works the same as:
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};
// take property name from the fruit variable
bag[fruit] = 5;
…But looks nicer.
We can use more complex expressions inside square brackets:
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
Square brackets are much more powerful than dot notation. They allow any property names and variables. But they are 
also more cumbersome to write.
So most of the time, when property names are known and simple, the dot is used. And if we need something more complex, 
then we switch to square brackets.

            Property value shorthand
In real code, we often use existing variables as values for property names.
For instance:
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...other properties
  };
}
let user = makeUser("John", 30);
alert(user.name); // John
In the example above, properties have the same names as variables. The use-case of making a property from a variable
is so common, that there’s a special property value shorthand to make it shorter.
Instead of name:name we can just write name, like this:

function makeUser(name, age) {
  return {
    name, // same as name: name
    age,  // same as age: age
    // ...
  };
}
We can use both normal properties and shorthands in the same object:
let user = {
  name,  // same as name:name
  age: 30
};

            Property names limitations
As we already know, a variable cannot have a name equal to one of the language-reserved words like “for”,
“let”, “return” etc.
But for an object property, there’s no such restriction:
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};
alert( obj.for + obj.let + obj.return );  // 6
In short, there are no limitations on property names. They can be any strings or symbols (a special type
for identifiers, to be covered later).
Other types are automatically converted to strings.
For instance, a number 0 becomes a string "0" when used as a property key:
let obj = {
  0: "test" // same as "0": "test"
};
// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
There’s a minor gotcha with a special property named __proto__. We can’t set it to a non-object value:
let obj = {};
obj.__proto__ = 5; // assign a number
alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended
As we see from the code, the assignment to a primitive 5 is ignored.
We’ll cover the special nature of __proto__ in subsequent chapters, and suggest the ways to fix such behavior.

            Property existence test, “in” operator
A notable feature of objects in JavaScript, compared to many other languages, is that it’s possible to access
any property. There will be no error if the property doesn’t exist!
Reading a non-existing property just returns undefined. So we can easily test whether the property exists:
let user = {};
alert( user.noSuchProperty === undefined ); // true means "no such property"
There’s also a special operator "in" for that.
The syntax is:
"key" in object
For instance:
let user = { name: "John", age: 30 };
alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist
Please note that on the left side of in there must be a property name. That’s usually a quoted string.
If we omit quotes, that means a variable should contain the actual name to be tested. For instance:
let user = { age: 30 };
let key = "age";
alert( key in user ); // true, property "age" exists
Why does the in operator exist? Isn’t it enough to compare against undefined?
Well, most of the time the comparison with undefined works fine. But there’s a special case when it fails, but
"in" works correctly.
It’s when an object property exists, but stores undefined:
let obj = {
  test: undefined
};
alert( obj.test ); // it's undefined, so - no such property?
alert( "test" in obj ); // true, the property does exist!
In the code above, the property obj.test technically exists. So the in operator works right.
Situations like this happen very rarely, because undefined should not be explicitly assigned. We mostly use
null for “unknown” or “empty” values. So the in operator is an exotic guest in the code.

            The "for..in" loop
To walk over all keys of an object, there exists a special form of the loop: for..in. This is a completely
different thing from the for(;;) construct that we studied before.
The syntax:
for (key in object) {
  // executes the body for each key among object properties
}
For instance, let’s output all properties of user:
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}
Note that all “for” constructs allow us to declare the looping variable inside the loop, like let key here.
Also, we could use another variable name here instead of key. For instance, "for (let prop in obj)" 
is also widely used.

            Ordered like an object
Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they
were added? Can we rely on this?
The short answer is: “ordered in a special fashion”: integer properties are sorted, others appear in creation order.
The details follow.
As an example, let’s consider an object with the phone codes:
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
The object may be used to suggest a list of options to the user. If we’re making a site mainly for a German audience
then we probably want 49 to be the first.
But if we run the code, we see a totally different picture:
USA (1) goes first
then Switzerland (41) and so on.
The phone codes go in the ascending sorted order, because they are integers. So we see 1, 41, 44, 49.
Integer properties? What’s that?
The “integer property” term here means a string that can be converted to-and-from an integer without a change.
So, "49" is an integer property name, because when it’s transformed to an integer number and back, it’s still the same. But "+49" and "1.2" are not:
// Number(...) explicitly converts to a number
// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
…On the other hand, if the keys are non-integer, then they are listed in the creation order, for instance:
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more
// non-integer properties are listed in the creation order
for (let prop in user) {
  alert( prop ); // name, surname, age
}
So, to fix the issue with the phone codes, we can “cheat” by making the codes non-integer. Adding a plus "+" 
sign before each code is enough.
Like this:
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};
for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
Now it works as intended.

            Summary
Objects are associative arrays with several special features.
They store properties (key-value pairs), where:
Property keys must be strings or symbols (usually strings).
Values can be of any type.
To access a property, we can use:
The dot notation: obj.property.
Square brackets notation obj["property"]. Square brackets allow taking the key from a variable, like obj[varWithKey].
Additional operators:
To delete a property: delete obj.prop.
To check if a property with the given key exists: "key" in obj.
To iterate over an object: for (let key in obj) loop.
What we’ve studied in this chapter is called a “plain object”, or just Object.

There are many other kinds of objects in JavaScript:
Array to store ordered data collections,
Date to store the information about the date and time,
Error to store the information about an error.
…And so on.
They have their special features that we’ll study later. Sometimes people say something like “Array type” 
or “Date type”, but formally they are not types of their own, but belong to a single “object” data type. 
And they extend it in various ways.
Objects in JavaScript are very powerful. Here we’ve just scratched the surface of a topic that is really huge. 
We’ll be closely working with objects and learning more about them in further parts of the tutorial.

-------------------------------------------------------------------------------------------------------------

            Object references and copying
One of the fundamental differences of objects versus primitives is that objects are stored and
copied “by reference”, whereas primitive values: strings, numbers, booleans, etc – are always
copied “as a whole value”.
That’s easy to understand if we look a bit under the hood of what happens when we copy a value.
Let’s start with a primitive, such as a string.
Here we put a copy of message into phrase:
let message = "Hello!";
let phrase = message;
As a result we have two independent variables, each one storing the string "Hello!".
Quite an obvious result, right?
Objects are not like that.
A variable assigned to an object stores not the object itself, but its “address in memory”
– in other words “a reference” to it.
Let’s look at an example of such a variable:
let user = {
  name: "John"
};
The object is stored somewhere in memory (at the right of the picture), while the user variable (at 
the left) has a “reference” to it.
We may think of an object variable, such as user, like a sheet of paper with the address of the object on it.
When we perform actions with the object, e.g. take a property user.name, the JavaScript engine looks 
at what’s at that address and performs the operation on the actual object.
Now here’s why it’s important.
When an object variable is copied, the reference is copied, but the object itself is not duplicated.
For instance:
let user = { name: "John" };
let admin = user; // copy the reference
Now we have two variables, each storing a reference to the same object:
As you can see, there’s still one object, but now with two variables that reference it.
We can use either variable to access the object and modify its contents:
let user = { name: 'John' };
let admin = user;
admin.name = 'Pete'; // changed by the "admin" reference
alert(user.name); // 'Pete', changes are seen from the "user" reference
It’s as if we had a cabinet with two keys and used one of them (admin) to get into it and make changes. 
Then, if we later use another key (user), we are still opening the same cabinet and can access the changed contents.

            Comparison by reference
Two objects are equal only if they are the same object.
For instance, here a and b reference the same object, thus they are equal:
let a = {};
let b = a; // copy the reference
alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
And here two independent objects are not equal, even though they look alike (both are empty):
let a = {};
let b = {}; // two independent objects
alert( a == b ); // false
For comparisons like obj1 > obj2 or for a comparison against a primitive obj == 5, objects are converted to
primitives. We’ll study how object conversions work very soon, but to tell the truth, such comparisons are
needed very rarely – usually they appear as a result of a programming mistake.

            Cloning and merging, Object.assign
So, copying an object variable creates one more reference to the same object.
But what if we need to duplicate an object?
We can create a new object and replicate the structure of the existing one, by iterating over its 
properties and copying them on the primitive level.
Like this:
let user = {
  name: "John",
  age: 30
};

let clone = {}; // the new empty object
// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it
alert( user.name ); // still John in the original object
We can also use the method Object.assign.
The syntax is:
Object.assign(dest, [src1, src2, src3...])
The first argument dest is a target object.
Further arguments src1, ..., srcN (can be as many as needed) are source objects.
It copies the properties of all source objects src1, ..., srcN into the target dest. In other words, properties of
all arguments starting from the second are copied into the first object.
The call returns dest.
For instance, we can use it to merge several objects into one:
let user = { name: "John" };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
// now user = { name: "John", canView: true, canEdit: true }
If the copied property name already exists, it gets overwritten:
let user = { name: "John" };
Object.assign(user, { name: "Pete" });
alert(user.name); // now user = { name: "Pete" }
We also can use Object.assign to replace for..in loop for simple cloning:
let user = {
  name: "John",
  age: 30
};
let clone = Object.assign({}, user);
It copies all properties of user into the empty object and returns it.
There are also other methods of cloning an object, e.g. using the spread syntax clone = {...user}, covered later
in the tutorial.

            Nested cloning
Until now we assumed that all properties of user are primitive. But properties can be references to other objects.
Like this:
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};
alert( user.sizes.height ); // 182
Now it’s not enough to copy clone.sizes = user.sizes, because user.sizes is an object, and will be copied by
reference, so clone and user will share the same sizes:
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};
let clone = Object.assign({}, user);
alert( user.sizes === clone.sizes ); // true, same object
// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, get the result from the other one
To fix that and make user and clone truly separate objects, we should use a cloning loop that examines each 
value of user[key] and, if it’s an object, then replicate its structure as well. That is called a “deep cloning”.
We can use recursion to implement it. Or, to not reinvent the wheel, take an existing implementation, 
for instance _.cloneDeep(obj) from the JavaScript library lodash.

            Const objects can be modified
An important side effect of storing objects as references is that an object declared as const can be modified.
For instance:
const user = {
  name: "John"
};
user.name = "Pete"; // (*)
alert(user.name); // Pete
It might seem that the line (*) would cause an error, but it does not. The value of user is constant, it must always 
reference the same object, but properties of that object are free to change.
In other words, the const user gives an error only if we try to set user=... as a whole.
That said, if we really need to make constant object properties, it’s also possible, but using totally different 
methods. We’ll mention that in the chapter Property flags and descriptors.

            Summary
Objects are assigned and copied by reference. In other words, a variable stores not the “object value”, but a 
“reference” (address in memory) for the value. So copying such a variable or passing it as a function argument 
copies that reference, not the object itself.
All operations via copied references (like adding/removing properties) are performed on the same single object.
To make a “real copy” (a clone) we can use Object.assign for the so-called “shallow copy” (nested objects 
are copied by reference) or a “deep cloning” function, such as _.cloneDeep(obj).

