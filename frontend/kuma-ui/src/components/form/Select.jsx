import React, { forwardRef } from 'react';

const Select = forwardRef((props, ref) => (
  <select ref={ref} {...props}>
    {props.children}
  </select>
));

export default Select;