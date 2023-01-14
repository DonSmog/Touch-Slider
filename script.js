//to know
// 1. Strings: "
// ``,"",''
// 2. Numbers: 1,2,3,4,5,6,7,8,9,0
// 3. Boolean: true,false
// 4. Null: null
// 5. Undefined: undefined
// 6. Object: {name:"sahil",age:20}
// 7. Array: [1,2,3,4,5,6,7,8,9,0], ["sahil","sahil","sahil"], [1,2,3,4,5,6,7,8,9,0,"sahil"], [{name:"sahil",age:20},{name:"sahil",age:20},{name:"sahil",age:20}]
// 8. Function: function(){}, ()=>{}
//what is a Function?
// 1. Function is a block of code which is used to perform a particular task.
// function ArrowDown() {
// }
//const, var and let
// 1. const: const is used to declare a variable which cannot be changed.
// 2. var: var is used to declare a variable which can be changed.
// 3. let: let is used to declare a variable which can be changed.
// 4. const, var and let are used to declare a variable.

//what is a variable?
// 1. A variable is a container which is used to store data.
// 2. A variable is a container which is used to store data which can be changed.
// let firstName = "sahil";

//conditionals
// 1. if.. else
// 2. switch
// 3. ternary operator ?: (condition) ? true : false
// 4. logical operator &&, ||, ??, ! (and, or, nullish coalescing, not)
//example of logical operator
// 1. true && true = true
// 2. true && false = false
// 3. false && true = false
// 4. false && false = false
// 5. true || true = true
// 6. true || false = true
// 7. false || true = true
// 8. false || false = false
// firstName && console.log('firstName'); //null
// firstName || console.log('firstName'); //sahil
// 9. true ?? true = true
// 5. for loop
// 6. while loop
// 7. do while loop

//equality operator
// 1. == (loose equality operator)
// 2. === (strict equality operator)
// 3. != (loose inequality operator)
// 4. !== (strict inequality operator)

//mapping, destructuring

const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide'));
//what is document.querySelector?
// 1. document.querySelector is used to select a element from the document.
//what is document.querySelectorAll?
// 1. document.querySelectorAll is used to select all the elements from the document.
//what is Array.from?
// 1. Array.from is used to convert a array like object to an array.
// [1,2,3,4,5]

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');
  slideImage.addEventListener('dragstart', (e) => e.preventDefault());

  //Touch Events
  slide.addEventListener('touchstart', touchStart(index));
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove);

  //Mouse Events
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mouseleave', touchEnd);
  slide.addEventListener('mousemove', touchMove);
});

//disable context Menu
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
    //.classList.remove('grabbing');
    //slide have class name of .slider-container
    //add class name of grabbing to .slider-container
    //class="slider-container grabbing"
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();

  slider.classList.remove('grabbing');
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  //what is event.type.includes?
  // 1. event.type.includes is used to check if a string includes another string.
  //what is pageX?
  // 1. pageX is used to get the horizontal coordinate of the mouse pointer.
  //what is touches[0].clientX;
  // 1. touches[0].clientX is used to get the horizontal coordinate of the touch pointer.
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
  // `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  //what is innerWidth?
  // 1. innerWidth is used to get the width of the window.
  prevTranslate = currentTranslate;
  setSliderPosition();
}
