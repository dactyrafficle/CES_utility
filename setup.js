

// graph of utility v delta
// when does linear reach 0 ?
// show expansion path
// when to make it full leontieff?

let myinput_delta, myinput_alpha, myinput_beta;
let obj;

let b = [];
let c = [];


(function() {

  window.addEventListener('load', function() {

    myinput_delta = document.getElementById('myinput_delta');
    myinput_alpha = document.getElementById('myinput_alpha');
    myinput_beta = document.getElementById('myinput_beta');

    myinput_delta.addEventListener('input', function() {
      obj = UPDATE_OBJ(myinput_delta, myinput_alpha, myinput_beta);
      UPDATE_BOX(b[0], obj);
    });
    myinput_alpha.addEventListener('input', function() {
      obj = UPDATE_OBJ(myinput_delta, myinput_alpha, myinput_beta);
      UPDATE_BOX(b[0], obj);
    });
    myinput_beta.addEventListener('input', function() {
      obj = UPDATE_OBJ(myinput_delta, myinput_alpha, myinput_beta);
      UPDATE_BOX(b[0], obj);
    });


    b[0] = new Box();
    c[0] = b[0].RETURN_CANVAS();
    container_indifference_curve.appendChild(c[0]);
    
    b[0].CANVAS_SIZE(500, 500);    // this is the number of pixels
    b[0].RANGE_X(-1, 11);          // set the range in x
    b[0].RANGE_Y(-1, 11);          // set the range in y 

    obj = UPDATE_OBJ(myinput_delta, myinput_alpha, myinput_beta);
    UPDATE_BOX(b[0], obj);
    
    
    b[1] = new Box();
    c[1] = b[1].RETURN_CANVAS();
    container_utility_vs_delta.appendChild(c[1]);
    
    b[1].CANVAS_SIZE(500, 500);    // this is the number of pixels
    b[1].RANGE_X(-1, 11);          // set the range in x
    b[1].RANGE_Y(-1, 11);          // set the range in y 
    
    b[1].LINE_WIDTH(1);
    b[1].STROKE_STYLE('#ddd');
    b[1].SHOW_GRID_X();
    b[1].SHOW_GRID_Y();
    
    
    let allocation = b[1].GET_CES_MARSHALLIAN_ALLOCATION({
      'delta':-0.1,
      'alpha':0.5,
      'beta':0.5,
      'px':1.25,
      'py':1,
      'budget':20
    });
    console.log(allocation);
    
    b[1].FILL_STYLE('#fc0a');
    b[1].RADIUS(3);
    b[1].SHOW_VALUE(allocation);

  }); // CLOSING window.onload
})(); // CLOSING anon

function UPDATE_OBJ(myinput_delta, myinput_alpha, myinput_beta) {
    
  let delta = parseFloat(myinput_delta.value);
  if (delta > 1) {
    delta = 1;
  }
  myinput_delta.value = delta.toFixed(2);
  
  let alpha = parseFloat(myinput_alpha.value);
  let beta = parseFloat(myinput_beta.value);
  
  return {
    'delta':delta,
    'alpha':alpha,  
    'beta':beta,
    'u':null,
    'x':b[0].data.range.x.avg,
    'y':b[0].data.range.y.avg
  };
}

function UPDATE_BOX(box, obj) {
  box.CLEAR_CANVAS();

  box.LINE_WIDTH(1);
  box.STROKE_STYLE('#ddd');
  box.SHOW_GRID_X();
  box.SHOW_GRID_Y();
  
  box.LINE_WIDTH(2);
  box.STROKE_STYLE('#999');
  box.CONNECT_VALUES([
    {'x':0,'y':box.data.range.y.min},
    {'x':0,'y':box.data.range.y.max}
  ]);
  box.CONNECT_VALUES([
    {'x':box.data.range.x.min,'y':0},
    {'x':box.data.range.x.max,'y':0}
  ]);
  
  box.LINE_WIDTH(2);
  box.STROKE_STYLE('#fc0a');
  let a = box.SHOW_CES_INDIFFERENCE_CURVE(obj);
  
  // THE RESTRICTED DOMAIN AND RANGE WHEN DELTA < 0
  /*
  if (a.delta < 0) {
    box.LINE_WIDTH(1);
    box.STROKE_STYLE('#ddd');
    box.CONNECT_VALUES([
      {'x':a.x_min,'y':box.data.range.y.min},
      {'x':a.x_min,'y':box.data.range.y.max}
    ]);
    box.CONNECT_VALUES([
      {'x':box.data.range.x.min,'y':a.y_min},
      {'x':box.data.range.x.max,'y':a.y_min}
    ]);
  }
  */

}