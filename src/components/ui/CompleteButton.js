import React from 'react';

function CompleteButton({callback,completed}) {

  return (
      <button className = {completed? 'completeButton completed' : 'completeButton notCompleted'} 
              type ='' onClick = {callback}></button>
  );
}

export default CompleteButton;