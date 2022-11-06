
(function() {

  let myinput_delta, myinput_alpha, myinput_beta;
  let obj = {
    'delta':null,
    'alpha':null,  
    'beta':null,
    'u':null,
    'x':5.5,
    'y':4.7
  }

  window.addEventListener('load', function() {

    myinput_delta = document.getElementById('myinput_delta_idc');
    myinput_alpha = document.getElementById('myinput_alpha_idc');
    myinput_beta = document.getElementById('myinput_beta_idc');

    obj.delta = CLEAN_INPUT(obj.delta, myinput_delta, -100, 1);
    obj.alpha = CLEAN_INPUT(obj.alpha, myinput_alpha, 0.01, 15);
    obj.beta = CLEAN_INPUT(obj.beta, myinput_beta, 0.01, 15);
    
    [myinput_delta, myinput_alpha, myinput_beta].forEach(function(a, index, arr) {

      arr[index].addEventListener('input', function() {
        
        obj.delta = CLEAN_INPUT(obj.delta, myinput_delta, -100, 1);
        obj.alpha = CLEAN_INPUT(obj.alpha, myinput_alpha, 0.01, 12); 
        obj.beta = CLEAN_INPUT(obj.beta, myinput_beta, 0.01, 12);

        UPDATE_BOX(b[0], obj);
      });
    
    });

    // INITIALIZE BOX
    b[0] = new Box();
    c[0] = b[0].RETURN_CONTAINER();
    container_indifference_curve.appendChild(c[0]);
    
      let w_ = window.innerWidth*0.9
      let h_ = w_;
      
      if (w_ > 500) {
        w_ = 500;
        h_ = w_;
      }
    
    
    b[0].RESIZE(w_, h_);    // this is the number of pixels
    b[0].RANGE_X(-1, 11);          // set the range in x
    b[0].RANGE_Y(-1, 11);          // set the range in y 

    window.addEventListener('resize', function() {
      
      
      let w_ = window.innerWidth*0.9
      let h_ = w_;
      
      if (w_ > 500) {
        w_ = 500;
        h_ = w_;
      }
      
      b[0].RESIZE(w_, h_);    // this is the number of pixels
      UPDATE_BOX(b[0], obj);
    });
      
    UPDATE_BOX(b[0], obj);
      
  }); // CLOSING window.onload

  // DEFINE IT LOCAL TO THE ANON FUNCTION
  function UPDATE_BOX(b, obj) {

    b.CLEAR_CANVAS();

    // THE GRID
    b.LINE_WIDTH(1);
    b.STROKE_STYLE('#ddd');
    b.SHOW_GRID_X();
    b.SHOW_GRID_Y();
    
    // THE AXIS
    b.LINE_WIDTH(2);
    b.STROKE_STYLE('#999');
    b.SHOW_AXES();
    
    // THE INDIFFERENCE CURVE
    b.LINE_WIDTH(2);
    b.STROKE_STYLE('#fc0a');
    let a = b.SHOW_CES_INDIFFERENCE_CURVE(obj);
    console.log(a);
    
    // THE POINT
    b.FILL_STYLE('#fc0a');
    b.RADIUS(2);
    b.SHOW_VALUE(obj);
    
    // THE DOMAIN AND RANGE
    b.LINE_WIDTH(1);
    b.STROKE_STYLE('#999');
    
    // SHOW THE DOMAIN AND RANGE
    if (a.delta !== 0) {
      b.CONNECT_VALUES([
        {'x':a.x_c,'y':b.data.range.y.min},
        {'x':a.x_c,'y':b.data.range.y.max}
      ]);
      b.CONNECT_VALUES([
        {'x':b.data.range.x.min,'y':a.y_c},
        {'x':b.data.range.x.max,'y':a.y_c}
      ]);
      
      b.FILL_STYLE('#999');
      b.RADIUS(1);
      b.SHOW_VALUE({
        'x':a.x_c,
        'y':a.y_c
      });
    }

  }

})(); // CLOSING anon



