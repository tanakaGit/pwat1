// client-side js
// run by the browser each time your view template is loaded

//console.log('hello world :o');

// our default array of dreams
// const dreams = [
//   '1. Confirm System Design in Pi3',
//   '2. How to setup Streaming Server on Azure',
//   '3. Build Mock(for PWA) in Pi3 '
// ];

// define variables that reference elements on our page
/**const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

// iterate through every dream and add it to our page
dreams.forEach( function(dream) {
  appendNewDream(dream);
});

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
};**/

/**document.querySelector('.buttonAction').addEventListener('touchstart', function() {
  //flag = true;
  
  // 何らかの処理
  foo();
});**/
var sendArr = [0,0,0,0,0,0];
var receiveArr = [0,0,0,0,0,0];
const resetArr = [1,1,1,1,1,1];
const defArr = [0,0,0,0,0,0];
const stopValue = 0;
const arrSize = sendArr.length;

const lUpButton = document.getElementById("l-b-up");
const lDownButton = document.getElementById("l-b-down");
const lLeftButton = document.getElementById("l-b-left");
const lRightButton = document.getElementById("l-b-right");
const rUpButton = document.getElementById("r-b-up");
const rDownButton = document.getElementById("r-b-down");
const rTurnLeftButton = document.getElementById("r-b-turnleft");
const rTurnRightButton = document.getElementById("r-b-turnright");
const rFrontButton = document.getElementById("r-b-front");
const rBackButton = document.getElementById("r-b-back");

var xhr = new XMLHttpRequest();

function doReset(){
  sendArr = resetArr;
  doSend();
  sendArr = defArr;
}

function doMakeArr(address,directionValue){
  var val = sendArr[address];
  if(val == directionValue){
     sendArr[address] = stopValue;
  }else{
    sendArr[address] = directionValue;
  }
  doSend();
}

//receive
function controllButton(){
  //
  for(var i=0;i<arrSize;i++){
    
    if(receiveArr[i] != 0){
       receiveArr[i] = stopValue;
    }
  }
}


//送信
function doSend(){
  //var obj = {"servo":sendArr}
  //var json = JSON.stringify(obj);
  
  //sendArrを送信
  xhr.open("POST","/api/transmit");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () { 
    if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json.servo )
    }
}
var data = JSON.stringify({ "servo" : sendArr });
xhr.send(data);
  /*
  xhr.addEventListener("load", function(e){
    var obj = {"servo":sendArr};
    var json = JSON.stringify(obj);
    console.log(json);
  });
  xhr.send();
  */
}

