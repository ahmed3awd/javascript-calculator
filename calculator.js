var Calculator = function() {

  //member variables declared as private conventionally 

  var data=""; //dummy variable used only for datashow
  var expression = ""; //the expression to be evaluated (e.g 2+1)
  var lastoper = ""; //last done operation (required for the multiple equal presses)
  var membuffer = "";
  var num1 = ""; //first number of the expression
  var num2 = ""; //second number of the expression
  var result = ""; //result

  //setters and getters for the member variables

  this.setExpression = function setExpression(exp) {
    expression = exp;
  };
  this.getExpression = function getExpression() {
    return expression;
  };
  this.setLastOper = function setLastOper(oper) {
    lastoper = oper;
  };
  this.getLastOper = function getLastOper() {
    return lastoper;
  };

  this.setNum1 = function setNum1(n1) {
    num1 = n1;
  };
  this.getNum1 = function getNum1() {
    return num1;
  };
  this.setNum2 = function setNum2(n2) {
    num2 = n2;
  };
  this.getNum2 = function getNum2() {
    return num2;
  };
  this.setResult = function setResult(r) {
    result = r;
  };
  this.getResult = function getResult() {
    return result;
  };


  //displays the buttons pressed values' to the screen (don't forget to rename it to keyPressed).
  //prepares the expression fro the calculate function aswell
  this.numberPressed = function numberPressed(n) {
    if(n== "."){
      if (data.indexOf(".") != -1){
        n="";
      }
    }
    expression = expression.concat(n);
     data=data.concat(n);
    var screen = document.getElementById("screen");
    if(n=== "/"|| n=== "+"|| n==="x"||n==="-"){
      screen.value = data.substr(0,length-2);
      data="";
      return;
    }
    screen.value = data;
  };
  
  //reverse the sign of the input
  this.negate = function negate(){
   var screen= document.getElementById("screen");
   var x=0;
    if(screen.value !== ""){
    x = -parseFloat(screen.value);
    expression = x.toString();
    data=expression;
    screen.value = x.toString();
    }
  };

  //handles the memory buffer buttons aka store,delete,manipulate variables
  this.handleMemoryBuffers = function handleMemoryBuffers(btn) {
    var screen =document.getElementById("screen");
    if (btn == "mc") {
      membuffer = "";
    }
    if (btn == "m") {
      if(data !=="")
      membuffer = parseFloat(data);
      if (expression.substr(1,expression.length-1).indexOf("x") != -1 || expression.substr(1,expression.length-1).indexOf("/") != -1 || expression.substr(1,expression.length-1).indexOf("+") != -1 || expression.substr(1,expression.length-1).indexOf("-") != -1) {
        this.numberPressed(membuffer);
        this.calculate();
      }
    }
    if (btn == "m+") {
      var x;
      if(membuffer === "") x=0;
      else x=parseFloat(membuffer);
      x += parseFloat(screen.value);
      membuffer = x.toString();
    }
    if (btn == "m-") {
      var y;
      if(membuffer ==="") y=0;
      else y=parseFloat(membuffer);
      y -= parseFloat(screen.value);
      membuffer = y.toString();
    }
  };


  //checks the keyboard button pressed then acts accordingly, it only works with numpads buttons and enter for now
  //for better performance consider checking for multiple key presses
  this.keyBoardPressed = function keyboardPressed(e) {
    if (e.keyCode == "106")
      this.numberPressed("x");
    if (e.keyCode == "111")
      this.numberPressed("/");
    if (e.keyCode == "107")
      this.numberPressed("+");
    if (e.keyCode == "109")
      this.numberPressed("-");
    if (e.keyCode == "13")
      this.calculate();
    if (e.keyCode == "27" || e.keyCode == "46")
      this.clear();
  };

  //clears the screen from previous values as well as resets the values.
  this.clear = function clear() {
    expression = "";
    lastoper = "";
    numbers = "";
    data="";
    num1 = 0;
    num2 = 0;
    result = 0;
    document.getElementById("screen").value = "";
  };

  //does the calculations such as add,sub,mult,div and successive equals.
  //hitting the equal button multiple times checks for the last operation done then re-do it on the new result;
  this.calculate = function calculate() {
    var screen = document.getElementById("screen");
    var numbers;
    //expression = screen.value;
    if (expression.substr(1,expression.length-1).indexOf("x") != -1) {
      lastoper = "x";
      numbers = expression.split("x");
      num1 = parseFloat(numbers[0]);
      num2 = parseFloat(numbers[1]);
      result = num1 * num2;
      expression = result.toString();
      data=expression;
      screen.value = expression;
    } else if (expression.substr(1,expression.length-1).indexOf("/") != -1) {
      lastoper = "/";
      numbers = expression.split("/");
      num1 = parseFloat(numbers[0]);
      num2 = parseFloat(numbers[1]);
      result = num1 / num2;
      expression = result.toString();
      data=expression;
      screen.value = expression;
    } else if (expression.substr(1,expression.length-1).indexOf("+") != -1) {
      lastoper = "+";
      numbers = expression.split("+");
      num1 = parseFloat(numbers[0]);
      num2 = parseFloat(numbers[1]);
      result = num1 + num2;
      expression = result.toString();
      data=expression;
      screen.value = expression;
    } else if (expression.substr(1,expression.length-1).indexOf("-") != -1) {
      if(!expression.startsWith("-")){
      lastoper = "-";
      numbers = expression.split("-");
      num1 = parseFloat(numbers[0]);
      num2 = parseFloat(numbers[1]);
      result = num1 - num2;
      expression = result.toString();
      data=expression;
      screen.value = expression;
      }else{    expression=expression.substr(1,expression.length-1);
      lastoper = "-";
      numbers = expression.split("-");
      num1 = parseFloat(numbers[0]);
      num2 = parseFloat(numbers[1]);
      result = -num1 - num2;
      expression = result.toString();
      data=expression;
      screen.value = expression;
        
      }
    } else {
      if (lastoper == "x") {
        result = result * num2;
        expression = result.toString();
        data=expression;
        screen.value = expression;
      }
      if (lastoper == "/") {
        result = result / num2;
        expression = result.toString();
        data=expression;
        screen.value = expression;
      }
      if (lastoper == "+") {
        result = result + num2;
        expression = result.toString();
        data=expression;
        screen.value = expression;
      }
      if (lastoper == "-") {
        result = result - num2;
        expression = result.toString();
        data=expression;
        screen.value = expression;
      }
    }


  };


};

//creating the calculator object
var c = new Calculator();
function start() {

  window.addEventListener("keypress", c.keyBoardPressed, false);

  var clr = document.getElementById("C");
  if (clr) {
    clr.addEventListener("click", function() {
      c.clear();
    }, false);

  }
  var mbuf = document.getElementById("mbuf");
  if (mbuf) {
    mbuf.addEventListener("click", function() {
      c.handleMemoryBuffers("m");
    }, false);
  }
  
  var mclr = document.getElementById("mclr");
  if(mclr){
  	mclr.addEventListener("click", function(){
    	c.handleMemoryBuffers("mc");
    }, false);
  }
  
  var mplus= document.getElementById("mplus");
  if(mplus){
  	mplus.addEventListener("click", function(){
    c.handleMemoryBuffers("m+");
    },false);
  }
  
  var mminus= document.getElementById("mminus");
  if(mminus){
  mminus.addEventListener("click", function(){
    c.handleMemoryBuffers("m-");
  },false);
  }
  
  var neg= document.getElementById("neg");
  if(neg)
    neg.addEventListener("click", function(){
      c.negate();
    },false);
  
  
  
  var one = document.getElementById("1");
  if (one)
    one.addEventListener("click", function() {
        c.numberPressed("1");
      },
      false);

  var two = document.getElementById("2");
  if (two)
    two.addEventListener("click", function() {
      c.numberPressed("2");
    }, false);

  var three = document.getElementById("3");
  if (three)
    three.addEventListener("click", function() {
      c.numberPressed("3");
    }, false);

  var four = document.getElementById("4");
  if (four)
    four.addEventListener("click", function() {
      c.numberPressed("4");
    }, false);

  var five = document.getElementById("5");
  if (five)
    five.addEventListener("click", function() {
      c.numberPressed("5");
    }, false);

  var six = document.getElementById("6");
  if (six)
    six.addEventListener("click", function() {
      c.numberPressed("6");
    }, false);

  var seven = document.getElementById("7");
  if (seven)
    seven.addEventListener("click", function() {
      c.numberPressed("7");
    }, false);

  var eight = document.getElementById("8");
  if (eight)
    eight.addEventListener("click", function() {
      c.numberPressed("8");
    }, false);

  var nine = document.getElementById("9");
  if (nine)
    nine.addEventListener("click", function() {
      c.numberPressed("9");
    }, false);

  var zero = document.getElementById("0");
  if (zero)
    zero.addEventListener("click", function() {
      c.numberPressed("0");
    }, false);

	
  var dot = document.getElementById("dot");
 	if(dot)
  var sc = document.getElementById("screen");
    dot.addEventListener("click", function(){
      c.numberPressed(".");
    },false);
    
    
  var mul = document.getElementById("mul");
  if (mul)
    mul.addEventListener("click", function() {
      c.numberPressed("x");
    }, false);

  var dv = document.getElementById("dv");
  if (dv)
    dv.addEventListener("click", function() {
      c.numberPressed("/");
    }, false);

  var add = document.getElementById("add");
  if (add)
    add.addEventListener("click", function() {
      c.numberPressed("+");
    }, false);

  var sub = document.getElementById("sub");
  if (sub)
    sub.addEventListener("click", function() {
      c.numberPressed("-");
    }, false);

  var eq = document.getElementById("eq");
  if (eq)
    eq.addEventListener("click", function() {
      c.calculate();
    }, false);
}
start();
//window.addEventListener("load", start, false);
