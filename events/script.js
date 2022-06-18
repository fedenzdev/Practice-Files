/*const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  alert("Hello World");
});
*/

function alertFunction() {
    alert("YAY! YOU DID IT!");
  }

  // METHOD 2
  btn.onclick = alertFunction;
  
  // METHOD 3
//  btn.addEventListener('click', alertFunction);