import React, { useState, useEffect } from 'react'

const ToggleButtons = ({ id }) => {
    
  const [ btnOn, setBtnOn ] = useState(false)
  
  // monitor the state of the toggle
  // add/remove click event handler to the document
  useEffect(() => {
    const clickHandler = ({ target }) => {
      const container = document.getElementById(`container-${id}`);
      if (container.contains(target)) return;
      setBtnOn(false);
    };

    document.addEventListener("click", clickHandler);

    // these functions clean up the event listeners
    return () => document.removeEventListener("click", clickHandler);
  });

  // same but for keypresses
  // if the esc key is pressed close the toggles
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode !== 27) return;
      setBtnOn(false);
    };
    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  });
  
  // assumes that show and active are classes for css
  return (
    <div id={id}>
      <button 
        aria-expanded={bntOn === true ? "true" : "false"}
        className={bntOn === true ? "active" : ""}
        onClick={ () => setBtnOn(!bntOn) }>
        Toggle
      </button>
      <ul className={bntOn ? "show" : ""}>
        <li>
          <a href="/some-link">Some Link</a>
        </li>
        <!-- more menu items -->
      </ul>
    </div>
  )
}

export default ToggleButtons