

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
      obj = UPDATE_OBJ(obj, myinput_delta, myinput_alpha, myinput_beta);
      UPDATE_BOX(b[0], obj);
    });
    myinput_alpha.addEventListener('input', function() {
      obj = UPDATE_OBJ(obj, myinput_delta, myinput_alpha, myinput_beta);
      UPDATE_BOX(b[0], obj);
    });
    myinput_beta.addEventListener('input', function() {
      obj = UPDATE_OBJ(obj, myinput_delta, myinput_alpha, myinput_beta);
      UPDATE_BOX(b[0], obj);
    });


    b[0] = new Box();
    c[0] = b[0].RETURN_CANVAS();
    container_indifference_curve.appendChild(c[0]);
    
    b[0].CANVAS_SIZE(500, 500);    // this is the number of pixels
    b[0].RANGE_X(-1, 11);          // set the range in x
    b[0].RANGE_Y(-1, 11);          // set the range in y 

    obj = UPDATE_OBJ(obj, myinput_delta, myinput_alpha, myinput_beta);
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
    
    b[1].FILL_STYLE('#fc0a');
    b[1].RADIUS(3);
    b[1].SHOW_VALUE(allocation);

  }); // CLOSING window.onload
})(); // CLOSING anon

function UPDATE_OBJ(obj, myinput_delta, myinput_alpha, myinput_beta) {
  
  let delta = parseFloat(myinput_delta.value);
  let alpha = parseFloat(myinput_alpha.value);
  let beta = parseFloat(myinput_beta.value);
  
  if (delta + 1 !== delta + 1) {
    myinput_delta.value = obj.delta.toFixed(2);
    return obj;
  }
  
  if (alpha + 1 !== alpha + 1) {
    myinput_alpha.value = obj.alpha.toFixed(2);
    return obj;
  }
  
  if (beta + 1 !== beta + 1) {
    myinput_beta.value = obj.beta.toFixed(2);
    return obj;
  }
  
  if (delta > 1) {
    delta = 1;
  }
  if (alpha > 12) {
    alpha = 12;
  }
  if (beta > 12) {
    beta = 12;
  }
  if (alpha < 0.01) {
    alpha = 0.01;
  }
  if (beta < 0.01) {
    beta = 0.01;
  }
  // 0.25, 0.10, 1.00 is buggy....why?
  
  myinput_delta.value = delta.toFixed(2);
  myinput_alpha.value = alpha.toFixed(2);
  myinput_beta.value = beta.toFixed(2);

  return {
    'delta':delta,
    'alpha':alpha,  
    'beta':beta,
    'u':null,
    'x':5.5,
    'y':4.7
  };
}

function UPDATE_BOX(b, obj) {

  b.CLEAR_CANVAS();

  b.LINE_WIDTH(1);
  b.STROKE_STYLE('#ddd');
  b.SHOW_GRID_X();
  b.SHOW_GRID_Y();
  
  // THE AXIS
  b.LINE_WIDTH(2);
  b.STROKE_STYLE('#999');
  b.SHOW_AXES();
  
  b.LINE_WIDTH(2);
  b.STROKE_STYLE('#fc0a');
  let a = b.SHOW_CES_INDIFFERENCE_CURVE(obj);
  console.log(a);
  
  b.FILL_STYLE('#fc0a');
  b.RADIUS(2);
  b.SHOW_VALUE(obj);
  
  /*
  // LEONTIEFF : HELP WITH 
  
  let arr2 = [];
  arr2[0] = {
    'x':0,
    'y':0
  }; 
  arr2[1] = {
    'x':b.data.range.x.max,
    'y':obj.beta / obj.alpha * b.data.range.x.max
  };
  b.LINE_WIDTH(1);
  b.STROKE_STYLE('#ddd'); 
  b.CONNECT_VALUES(arr2);
  */
  
  // THE RESTRICTED DOMAIN AND RANGE WHEN DELTA < 0
  
  /*
  if (a.delta < 0) {
    b.LINE_WIDTH(1);
    b.STROKE_STYLE('#999');
    b.CONNECT_VALUES([
      {'x':a.x_min,'y':b.data.range.y.min},
      {'x':a.x_min,'y':b.data.range.y.max}
    ]);
    b.CONNECT_VALUES([
      {'x':b.data.range.x.min,'y':a.y_min},
      {'x':b.data.range.x.max,'y':a.y_min}
    ]);
  }
  */

}