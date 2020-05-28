import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const app = document.getElementById("app");

/* App
 **************************************/
function PinCodeInput() {
  const [pin, setPin] = useState("");
  const MAX_LENGTH = 6;

  return (
    <div id="PinCodeInput">
      <p>Saisissez votre code PIN à {MAX_LENGTH} chiffres</p>
      <Printer value={pin} maxLength={MAX_LENGTH} />
      <Keyboard
        random
        value={pin}
        setValue={setPin}
        disabled={pin.length === MAX_LENGTH}
      />
    </div>
  );
}

/* Printer
 **************************************/
function Printer({ value, maxLength }) {
  // Create an array(maxLength) containing each digit and fill the missing ones with empty strings
  const dots = [...value.split("")].concat(new Array(maxLength).fill(""));
  dots.length = maxLength;

  return (
    <div id="Printer">
      {dots.length > 0 &&
        dots.map((dot, index) => {
          return (
            <div
              className={"Printer__dot " + (dot !== "" ? "filled" : "")}
              key={index}
            ></div>
          );
        })}
    </div>
  );
}

/* Keyboard - with Randomized Layout
 **************************************/
function Keyboard({ value, setValue, random, disabled }) {
  // Array [1...9, 0]
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    // Array [1...9, 0]
    const digitKeys = [...Array(10).keys()];
    digitKeys.splice(0, 1);
    digitKeys.push(0);

    // Randomise the layout of the keys for more secure input
    if (random) shuffle(digitKeys);

    setKeys(digitKeys);
  }, [disabled]);

  function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
  }

  function handleInput(digit) {
    setValue(value + digit);
  }

  function handleDelete() {
    const newValue = value.substring(0, value.length - 1);

    setValue(newValue);
  }

  function resetValue() {
    setValue("");
  }

  if (!disabled) {
    return (
      <div id="Keyboard">
        {keys.length > 0 &&
          keys.map((digitKey, index) => {
            // if last digitKey
            if (index === keys.length - 1) {
              return (
                <React.Fragment key={index}>
                  <div className="Keyboard__action_button">
                    <button onClick={resetValue}>
                      <ResetIcon />
                    </button>
                  </div>
                  <div className="Keyboard__digitKey">
                    <button onClick={() => handleInput(digitKey)}>
                      {digitKey}
                    </button>
                  </div>
                  <div className="Keyboard__action_button">
                    <button onClick={handleDelete}>
                      <DeleteIcon />
                    </button>
                  </div>
                </React.Fragment>
              );
            } else {
              return (
                <div className="Keyboard__digitKey" key={index}>
                  <button onClick={() => handleInput(digitKey)}>
                    {digitKey}
                  </button>
                </div>
              );
            }
          })}
      </div>
    );
  } else
    return (
      <div id="PinCodeInput__Keyboard reset">
        <p>Vous avez saisi: {value} </p>
        <button onClick={resetValue}>Recommencer</button>
      </div>
    );
}

/* Icons
 **************************************/
function ResetIcon() {
  return (
    <svg
      style={{
        width: 24,
        height: 24,
      }}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
      />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      style={{
        width: 24,
        height: 24,
      }}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z"
      />
    </svg>
  );
}

/* Render
 **************************************/
ReactDOM.render(<PinCodeInput />, app);
