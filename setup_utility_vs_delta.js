
// interesting when alpha + beta = 1, the orange line is continuous

(function() {

  let myinput_delta, myinput_alpha, myinput_beta, myinput_px, myinput_py, myinput_budget;
  let myoutput_A_uvd, myoutput_B_uvd, myoutput_C_uvd;
  let obj = {
    'delta':null,
    'alpha':null,  
    'beta':null,
    'px':null,
    'py':null,
    'budget':null
  };
  let current_allocation;
  
  window.addEventListener('load', function() {
    
    myinput_delta = document.getElementById('myinput_delta_uvd');
    myinput_alpha = document.getElementById('myinput_alpha_uvd');
    myinput_beta = document.getElementById('myinput_beta_uvd');
    myinput_px = document.getElementById('myinput_px_uvd');
    myinput_py = document.getElementById('myinput_py_uvd');
    myinput_budget = document.getElementById('myinput_budget_uvd');
    
    myoutput_A = document.getElementById('myoutput_A_uvd');
    myoutput_B = document.getElementById('myoutput_B_uvd');
    myoutput_C = document.getElementById('myoutput_C_uvd');
    
    obj.delta = CLEAN_INPUT(obj.delta, myinput_delta, -5, 1);
    obj.alpha = CLEAN_INPUT(obj.alpha, myinput_alpha, 0.01, 12);
    obj.beta = CLEAN_INPUT(obj.beta, myinput_beta, 0.01, 12);
    obj.px = CLEAN_INPUT(obj.px, myinput_px, 0.01, 5);
    obj.py = CLEAN_INPUT(obj.py, myinput_py, 0.01, 5);
    obj.budget = CLEAN_INPUT(obj.budget, myinput_budget, 1, 100); 
    
    [myinput_delta, myinput_alpha, myinput_beta, myinput_px, myinput_py, myinput_budget].forEach(function(a, index, arr) {
      
      arr[index].addEventListener('input', function() {
        
        obj.delta = CLEAN_INPUT(obj.delta, myinput_delta, -5, 1);
        obj.alpha = CLEAN_INPUT(obj.alpha, myinput_alpha, 0.01, 12);
        obj.beta = CLEAN_INPUT(obj.beta, myinput_beta, 0.01, 12);
        obj.px = CLEAN_INPUT(obj.px, myinput_px, 0.01, 5);
        obj.py = CLEAN_INPUT(obj.py, myinput_py, 0.01, 5);
        obj.budget = CLEAN_INPUT(obj.budget, myinput_budget, 1, 100);
        
        current_allocation = UPDATE_BOX(b[1], obj);
        console.log(current_allocation);
        myoutput_A.innerHTML = (current_allocation.A).toFixed(4);
        myoutput_B.innerHTML = (current_allocation.B).toFixed(4);
        myoutput_C.innerHTML = (current_allocation.C).toFixed(4);
        
      });
      
    });
    
    // INITIALIZE BOX
    b[1] = new Box();
    c[1] = b[1].RETURN_CONTAINER();
    container_utility_vs_delta.appendChild(c[1]);
    
    b[1].RESIZE(500, 500);
    b[1].RANGE_X(-5, 1);
    b[1].RANGE_Y(-1, 10);
    

    current_allocation = UPDATE_BOX(b[1], obj);
    console.log(current_allocation);
    myoutput_A.innerHTML = (current_allocation.A).toFixed(4);
    myoutput_B.innerHTML = (current_allocation.B).toFixed(4);
    myoutput_C.innerHTML = (current_allocation.C).toFixed(4);

  }); // CLOSING window.onload
  
  // DEFINE IT LOCAL TO THE ANON FUNCTION
  function UPDATE_BOX(b, obj) {

    b.CLEAR_CANVAS();

    // RESET THE RANGE
    if (obj.px > obj.py) {
      b.RANGE_Y(-1, obj.budget/obj.py * 1.1);
    } else {
      b.RANGE_Y(-1, obj.budget/obj.px * 1.1);
    }

    // THE GRID
    b.LINE_WIDTH(1);
    b.STROKE_STYLE('#ddd');
    b.SHOW_GRID_X();
    b.SHOW_GRID_Y();
    
    // THE AXIS
    b.LINE_WIDTH(2);
    b.STROKE_STYLE('#999');
    b.SHOW_AXES();
    
    // THE DELTA LINE
    b.LINE_WIDTH(1);
    b.STROKE_STYLE('#999');
    b.CONNECT_VALUES([{
      'x':obj.delta,
      'y':b.data.range.y.min
    },{
      'x':obj.delta,
      'y':b.data.range.y.max
    }]);
    
    let current_allocation = b.GET_CES_MARSHALLIAN_ALLOCATION({
      'delta':obj.delta,
      'alpha':obj.alpha,
      'beta':obj.beta,
      'px':obj.px,
      'py':obj.py,
      'budget':obj.budget
    });
    
    b.RADIUS(2);

    b.FILL_STYLE('#fc0a');
    b.SHOW_VALUE({'x':obj.delta,'y':current_allocation.u});
    
    
    b.FILL_STYLE('#28fa');
    b.SHOW_VALUE({'x':obj.delta,'y':current_allocation.x});

    b.FILL_STYLE('#6c9a');
    b.SHOW_VALUE({'x':obj.delta,'y':current_allocation.y});
    
    let x_scale = 100;
    let x_min = Math.floor(delta = b.data.range.x.min)*x_scale;
    let x_max = Math.ceil(delta = b.data.range.x.max)*x_scale;
    
    let u_arr = [[],[],[]];
    let x_arr = [[]];
    let y_arr = [[]];

    for (let i = x_min; i < x_max; i += 1) {
    
      let delta = i / x_scale;
    
      let allocation = b.GET_CES_MARSHALLIAN_ALLOCATION({
        'delta':delta,
        'alpha':obj.alpha,
        'beta':obj.beta,
        'px':obj.px,
        'py':obj.py,
        'budget':obj.budget
      });
      
      x_arr[0].push({
        'x':allocation.delta,
        'y':allocation.x
      });
      
      y_arr[0].push({
        'x':allocation.delta,
        'y':allocation.y
      });
      
      if (delta < 0) {
        u_arr[0].push({
          'x':allocation.delta,
          'y':allocation.u
        });
      }
      if (delta === 0) {
        
        // COBB DOUGLAS
        u_arr[1].push({
          'x':allocation.delta,
          'y':allocation.u
        });
        
        // LOG
        u_arr[1].push({
          'x':allocation.delta,
          'y':allocation.alpha * Math.log(allocation.x) + allocation.beta * Math.log(allocation.y)
        });
      }
      if (delta > 0) {
        u_arr[2].push({
          'x':allocation.delta,
          'y':allocation.u
        });
      }
      
    }
    
    b.LINE_WIDTH(2);

    b.STROKE_STYLE('#28fa');
    b.CONNECT_VALUES(x_arr[0]);
    
    b.STROKE_STYLE('#6c9a');
    b.CONNECT_VALUES(y_arr[0]);
    
    b.STROKE_STYLE('#fc07');
    b.CONNECT_VALUES(u_arr[0]);
    
    b.FILL_STYLE('#fc0a');
    b.RADIUS(2);
    b.SHOW_VALUE(u_arr[1][0]); // COBB DOUGLAS : I DONT THINK THEY ARE EVER EQUAL. the cobb douglas is good. but the log version. that's just a transformation
    // b.SHOW_VALUE(u_arr[1][1]); // LOG
    
    b.CONNECT_VALUES(u_arr[2]);

    return current_allocation;
  }

})(); // CLOSING anon

