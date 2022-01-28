let b = [];
let c = [];

function CLEAN_INPUT(current_value, input_element, min, max) {
  
  let output = null;
  
  if (input_element !== null) {
    
    output = parseFloat(input_element.value);
    
    if (output + 1 !== output + 1) {
      input_element.value = current_value.toFixed(2);
      return current_value;
    }
    if (output > max) {output = max;}
    if (output < min) {output = min;}
    input_element.value = output.toFixed(2);
  }
  
  return output;
}