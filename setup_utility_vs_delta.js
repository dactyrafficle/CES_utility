
(function() {

  let myinput_alpha_uvd, myinput_beta_uvd, myinput_px_uvd, myinput_py_uvd, myinput_budget_uvd;
  let obj;
  
  window.addEventListener('load', function() {

    myinput_alpha_uvd = document.getElementById('myinput_alpha_uvd');
    myinput_beta_uvd = document.getElementById('myinput_beta_uvd');
    myinput_px_uvd = document.getElementById('myinput_px_uvd');
    myinput_py_uvd = document.getElementById('myinput_py_uvd');
    myinput_budget_uvd = document.getElementById('myinput_budget_uvd');
    
    [myinput_alpha_uvd, myinput_beta_uvd, myinput_px_uvd, myinput_py_uvd, myinput_budget_uvd].forEach(function(a, index, arr) {
      
      arr[index].addEventListener('input', function() {
        // obj = UPDATE_OBJ(obj, null, myinput_alpha_uvd, myinput_beta_uvd, myinput_px_uvd, myinput_py_uvd, myinput_budget_uvd);
        console.log(obj);
        // UPDATE_BOX(b[1], obj);
        // console.log(index);
      });
      
    });
    

    // obj = UPDATE_OBJ(obj, myinput_delta_idc, myinput_alpha_idc, myinput_beta_idc);

   
    
    b[1] = new Box();
    c[1] = b[1].RETURN_CANVAS();
    container_utility_vs_delta.appendChild(c[1]);
    
    b[1].CANVAS_SIZE(500, 500);    // this is the number of pixels
    b[1].RANGE_X(-5, 1);          // set the range in x
    b[1].RANGE_Y(-5, 10);          // set the range in y 
    
    b[1].LINE_WIDTH(1);
    b[1].STROKE_STYLE('#ddd');
    b[1].SHOW_GRID_X();
    b[1].SHOW_GRID_Y();
    
    b[1].LINE_WIDTH(1);
    b[1].STROKE_STYLE('#999');
    b[1].SHOW_AXES();
    
    let x_scale = 100;
    let x_min = Math.floor(delta = b[1].data.range.x.min)*x_scale;
    let x_max = Math.ceil(delta = b[1].data.range.x.max)*x_scale;
    
    let u_arr = [[],[],[]];
    let x_arr = [[]];
    let y_arr = [[]];

    for (let i = x_min; i < x_max; i += 1) {
    
      let delta = i / x_scale;
    
      let allocation = b[1].GET_CES_MARSHALLIAN_ALLOCATION({
        'delta':delta,
        'alpha':0.7,
        'beta':0.4,
        'px':1.25,
        'py':1,
        'budget':10
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
        u_arr[1].push({
          'x':allocation.delta,
          'y':allocation.u
        });
      }
      if (delta > 0) {
        u_arr[2].push({
          'x':allocation.delta,
          'y':allocation.u
        });
      }
      
    }
    
    b[1].LINE_WIDTH(1);

    b[1].STROKE_STYLE('#5d5d');
    b[1].CONNECT_VALUES(x_arr[0]);
    
    b[1].STROKE_STYLE('#c2d1f0');
    b[1].CONNECT_VALUES(y_arr[0]);
    
    // console.log(u_arr);
    b[1].STROKE_STYLE('#fc0a');
    b[1].LINE_WIDTH(1);
    b[1].CONNECT_VALUES(u_arr[0]);
    
    b[1].FILL_STYLE('#fc0a');
    b[1].RADIUS(3);
    b[1].SHOW_VALUE(u_arr[1][0]);
    
    b[1].CONNECT_VALUES(u_arr[2]);
      
  }); // CLOSING window.onload
})(); // CLOSING anon

