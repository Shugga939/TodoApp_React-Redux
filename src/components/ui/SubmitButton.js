import React from 'react';

function SubmitButton({callback, title}) {

  return (
      <button className = 'submitButton' type ='submit' onClick = {callback}>{title}</button>
  );
}

export default SubmitButton;