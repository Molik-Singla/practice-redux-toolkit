import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByNumber } from "./counterSlice";

const Counter = () => {
    const count = useSelector((state) => state.counter_1.count);
    const dispatch = useDispatch();

    return (
        <div>
            {count}
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
            <button onClick={() => dispatch(incrementByNumber(5))}> + by 5</button>
        </div>
    );
};

export default Counter;
