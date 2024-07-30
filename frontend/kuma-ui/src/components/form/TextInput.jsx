import React, { forwardRef } from 'react';

const TextInput = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

export default TextInput;