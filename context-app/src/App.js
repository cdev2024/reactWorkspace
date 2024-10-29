import React, { useContext } from "react";
import { CountContext } from "./CountProvider";

const App = () => {
  const { count, increment, decrement } = useContext(CountContext);

  return (
    <div>
      <h1>카운트: {count}</h1>
      <button onClick={decrement}>감소</button>
      <button onClick={increment}>증가</button>
    </div>
  );
};

export default App;
