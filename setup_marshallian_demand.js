  (function() {
    
    let b, c;
    let A = 1;
    window.addEventListener('load', function() {
      b = new Box();
      c = b.RETURN_CANVAS();
      // container_expansion_path.appendChild(c);

      b.CANVAS_SIZE(500, 500);     // this is the number of pixels 
      b.RANGE_X(-5, 1);           // set the range in x 
      b.RANGE_Y(-5, 11);           // set the range in y 

      b.CLEAR_CANVAS();

      // DRAW AN X-Y GRID 
      b.LINE_WIDTH(1);
      b.STROKE_STYLE('#ddd');
      b.SHOW_GRID_X();
      b.SHOW_GRID_Y();

      b.LINE_WIDTH(2);
      b.STROKE_STYLE('#999');
      b.SHOW_AXES();
      
      let A = 1.5;
      let B = [];
      let C = [];

      let x_min = b.data.range.x.min;
      let x_max = b.data.range.x.max;
      let dx = 0.01;
      let index = 0;
      for (let x = x_min; x < x_max; x += dx) {
        B[index] = {'x':x,'y':1/(x-1)};
        C[index] = {'x':x,'y':A**B[index].y};
        index++;
      }

      b.LINE_WIDTH(1);
      b.STROKE_STYLE('#fc0a');
      b.CONNECT_VALUES(B);
      
      b.LINE_WIDTH(1);
      b.STROKE_STYLE('#5d5d');
      b.CONNECT_VALUES(C);

      
    });
  })();