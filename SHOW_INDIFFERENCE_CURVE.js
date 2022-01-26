/*

 u = (alpha/delta)*x**delta + (beta/delta)*y**delta

 obj = {
  'delta':delta,    // must
  'alpha':alpha,    // must
  'beta':beta,      // must
  'u':u,            // SUFFICIENT, BUT NOT A GOOD CHOICE
  'x':x,            // PREFERABLE
  'y':y             // PREFERABLE
  'M',M,
  'px':px,
  'py':py
 }

 b.LINE_WIDTH(1);
 b.STROKE_STYLE('#ddd');
 b.FILL_STYLE('#fc0a');


  FUNCTIONAL DEPENDENCIES
  1. this.CONNECT_VALUES(arr)

*/


// CES UTILITY
Box.prototype.SHOW_INDIFFERENCE_CURVE = function(obj) {
  
  // must have delta, alpha and beta
  // and we must either have utility, or have what we need to make utility
 
  // case 1 : u
  // case 2 : u=f(x,y)
  // case 3 : x=f(M,px) : y=f(M,py) : u=f(x,y)

  let alpha, alpha_inv, beta, beta_inv, delta, delta_inv;
  let u;
  let x, y;

  alpha = obj.alpha;
  alpha_inv = 1/alpha;
  beta = obj.beta;
  beta_inv = 1/beta;
  
  delta = obj.delta;
  
  if (delta === 0) {
    delta_inv = null;
  } else {
    delta_inv = 1/delta;
  }

  // FIRST CASE :
  if (obj.u) {
    u = obj.u;
  }

  // SECOND CASE : u = u(x, y)
  if (!obj.u && (obj.x && obj.y)) {
    x = obj.x;
    y = obj.y;
    
    if (delta === 0) {
      u = x**alpha*y**beta;
    } else {
      u = (alpha/delta)*x**delta + (beta/delta)*y**delta;
    }
  }

  /*
  // THIRD CASE : u = u(budget, px, py)
  let budget, px, py;
  if (!obj.u && (!obj.x && !obj.y) && (obj.budget && obj.px && obj.py)) {
    // console.log('CASE 3');
    budget = obj.budget;
    px = obj.px;
    py = obj.py;
    x = alpha*budget/px;
    y = beta*budget/py;
    u = x**alpha*y**beta;
  }
  */



  // STORE ALL THE POINTS
  let arr = [];

  // THE RANGE WILL BE FROM 0 TO MAX, SINCE WE CANT HAVE NEGATIVE X OR Y
  let dx = this.data.range.x.max / 50;
  let dy = this.data.range.y.max / 50; 

  // RELEVANT IF delta < 0
  let x_min = ((delta/alpha)*u)**delta_inv;
  let y_min = ((delta/beta)*u)**delta_inv;

  
  let x_index = dx;
  let y_index = dy;
  
  for (let i = 0; i <= 50; i++) {
    
    // THE GENERAL CASES
    if (delta > 0 || (delta < 0 && x_index >= x_min)) {
      arr.push({
        'x':x_index,
        'y':((delta/beta)*u - (alpha/beta)*x_index**delta)**delta_inv
      });
    }

    if (delta > 0 || (delta < 0 && y_index >= y_min)) {
      arr.push({
        'x':((delta/alpha)*u - (beta/alpha)*y_index**delta)**delta_inv,
        'y':y_index
      });
    }

    // COBB-DOUGLAS
    if (delta === 0) {
      arr.push({
        'x':x_index,
        'y':(u/x_index**alpha)**beta_inv
      });
      arr.push({
        'x':(u/x_index**beta)**alpha_inv,
        'y':y_index
      });
    }
    

    
    x_index += dx;
    y_index += dy;
    
  }
  

  // SORT ARR : IF it's almost leontieff, ie. delta = -140, then i need to sort by x, from lowest to smallest
  // then if 2 points have the same x, from largest to smallest
  arr.sort(function(a,b) {
    return a.x - b.x;
  });
  // console.log(arr);
  
  // once its sorted, it might make sense to do a while loop to remove the points at the beginning and end that are not on the grid
  
  this.CONNECT_VALUES(arr);
  
  return {
    'alpha':alpha,
    'alpha_inv':alpha_inv,
    'beta':beta,
    'beta_inv':beta_inv,
    'delta':delta,
    'delta_inv':delta_inv,
    'x_min':x_min,
    'y_min':y_min,
    'u':u,
    'x':x,
    'y':y,
    'preference':null
  }
}


/*
  let dx_pixel = 2; // if dx_pixel = 2, then we calculate x-y every 2nd pixel
  let dx = dx_pixel * (this.data.range.x.span / this.data.dimension.w );

  let temp = {
    'x':this.data.range.x.min,
    'y':null
  };
  
  if (delta === 0) {
    temp.y = (u/this.data.range.x.min**alpha)**beta_inv;  // cobb-douglas
    console.log(temp);
  } else {
    temp.y = ((delta/beta)*u - (alpha/beta)*this.data.range.x.min**delta)**delta_inv; // else
  }
  
  let counter = 0;
  
  if (delta === 0) {
    // cobb-douglas
    console.log('cobb-douglas');
    
    for (let x = this.data.range.x.min + dx; x < this.data.range.x.max + dx; x += dx) {

      let y = (u/x**alpha)**beta_inv;
      let val = {'x':x, 'y': y};
      
      // AS LONG AS ONE POINT IS IN RANGE, WE DRAW THE LINE
      // if (this.VALUE_IN_RANGE(temp) || this.VALUE_IN_RANGE(val)) {
      if (this.VALUE_IN_RANGE(temp) || this.VALUE_IN_RANGE(val)) {
        this.CONNECT_VALUES([temp, val]);
      }
      temp = val;
    } // closing for loop
  
  } else {
    // else case
    console.log('else case');
    for (let x = this.data.range.x.min + dx; x < this.data.range.x.max+dx; x += dx) {

      let y = ((delta/beta)*u - (alpha/beta)*x**delta)**delta_inv;
      let val = {'x':x, 'y': y};
      
      let showdot = false;
      
      // AS LONG AS ONE POINT IS IN RANGE, WE DRAW THE LINE
      // if (this.VALUE_IN_RANGE(temp) || this.VALUE_IN_RANGE(val)) {
      if (this.VALUE_IN_RANGE(temp) || this.VALUE_IN_RANGE(val)) {
        this.CONNECT_VALUES([temp, val]);
        showdot = true;
      }
      
      if (showdot) {
        // console.log(temp);
        this.FILL_STYLE('#5d5d');
        this.RADIUS(2);
        this.SHOW_VALUE({'x':val.x,'y':this.data.range.y.avg});
      }
      
      temp = val;
      


      
      
      counter++;
    } // closing for loop
      
  } // closing else statement
*/