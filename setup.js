
let myinput_delta, myinput_alpha, myinput_beta;
let obj;
let b, c;
  
(function() {

  window.addEventListener('load', function() {

    myinput_delta = document.getElementById('myinput_delta');
    myinput_alpha = document.getElementById('myinput_alpha');
    myinput_beta = document.getElementById('myinput_beta');

    myinput_delta.addEventListener('input', function() {
      obj = UPDATE_OBJ(myinput_delta, myinput_alpha, myinput_beta);
      UPDATE_BOX(b, obj);
    });
    myinput_alpha.addEventListener('input', function() {
      obj = UPDATE_OBJ(myinput_delta, myinput_alpha, myinput_beta);
      UPDATE_BOX(b, obj);
    });
    myinput_beta.addEventListener('input', function() {
      obj = UPDATE_OBJ(myinput_delta, myinput_alpha, myinput_beta);
      UPDATE_BOX(b, obj);
    });


    b = new Box();
    c = b.RETURN_CANVAS();
    container_001.appendChild(c);
    
    b.CANVAS_SIZE(500, 500);    // this is the number of pixels
    b.RANGE_X(-1, 11);          // set the range in x
    b.RANGE_Y(-1, 11);          // set the range in y 

    b.ADD_CLICK();
    b.ADD_MOUSEMOVE();

    obj = UPDATE_OBJ(myinput_delta, myinput_alpha, myinput_beta);
    UPDATE_BOX(b, obj);

  }); // CLOSING window.onload
})(); // CLOSING anon

function UPDATE_OBJ(myinput_delta, myinput_alpha, myinput_beta) {
    
  let delta = parseFloat(myinput_delta.value);
  let alpha = parseFloat(myinput_alpha.value);
  let beta = parseFloat(myinput_beta.value);
  
  return {
    'delta':delta,
    'alpha':alpha,  
    'beta':beta,
    'u':null,
    'x':b.data.range.x.avg,
    'y':b.data.range.y.avg
  };
}

function UPDATE_BOX(box, obj) {
  box.CLEAR_CANVAS();

  box.LINE_WIDTH(1);
  box.STROKE_STYLE('#ddd');
  box.SHOW_GRID_X();
  box.SHOW_GRID_Y();

  box.LINE_WIDTH(2);
  box.STROKE_STYLE('#fc0a');
  let a = box.SHOW_INDIFFERENCE_CURVE(obj);
  console.log(a);
}