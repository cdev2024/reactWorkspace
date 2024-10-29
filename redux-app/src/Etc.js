import React from "react";
import { useSelector } from "react-redux";

const Etc = () => {
  const count = useSelector((state) => state.counter.count);

  return (
    <div>
      <h2>전역 카운트 값. Etc 컴포넌트 {count} </h2>
    </div>
  );
};

export default Etc;
