import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch(); // 액션 접근

  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={() => dispatch(decrement())}>감소</button>
      <button onClick={() => dispatch(increment())}>증가</button>
    </div>
  );
};

export default Counter;
