import React, { useState, useMemo, memo, useEffect, useRef } from 'react';
// , PureComponent, memo, useState, useMemo, useCallback

const Count = memo(function Count(props) {
    console.log('count render')
    return <div onClick={props.onClick}>子组件count值：{props.double}</div>
})
function CountVal(props) {

    const [count, setCount] = useState(0);

    //第一个参数是要执行的函数
    //第二个参数是执行函数依赖的变量组成的数据
    //这里只有count发生变化double才会重新计算
    const double = useMemo(() => {
        return count * 2;
    }, [count])

    //这样返回的函数就会在组件重渲染时产生相同的句柄
    const onClick = useMemo(() => {
        //这里返回的依然是函数
        return () => {
            console.log('click')
        }
    }, []);
    const couterRef = useRef();
    //   count===3 会从false变为true，再变成false。中间发生了两次变化。所以double的值发生了两次变化。

    useEffect(() => {
        console.log(couterRef)
    },[count])
    return (
        <div className="app" ref={couterRef}>
            <p>父组件count值：{count}</p>
            {/* double  依赖不同时才会重新渲染*/}
            <Count double={double} onClick={onClick} />
            <button
                onClick={() => {
                    setCount(count + 1)
                }}>
                Add
     </button>
            <div>double值：{double}</div>
        </div>
    )
}

export default CountVal;

// 如果useMemo返回的是一个函数，则可以用useCallback省略顶层的函数。 将包裹的onClick函数用useCallback包裹：
// 因此useCallback是useMemo的变体。

// useMemo(()=>return fn);
// //等价
// useCallback(fn);