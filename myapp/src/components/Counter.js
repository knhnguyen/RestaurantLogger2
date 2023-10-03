import React from "react";
import { useState } from "react";

function Counter() {
  let [currentCount, setCount] = useState(0);
  function decrementCount() {
    setCount(currentCount - 1);
  }
  function incrementCount() {
    setCount(currentCount + 1);
  }
  return (
    <div>
      {/* <button onClick={setCount()}>reset</button> */}
      <button onClick={incrementCount}>+</button>
      <span>{currentCount}</span>
      <button onClick={decrementCount}>-</button>
    </div>
  );
}

export default Counter;
