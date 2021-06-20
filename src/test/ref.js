import React, { useCallback, useRef } from 'react';


// 实现 ref 的转发 传递ref 实现父组件操作该ref
const FancyButton = React.forwardRef((props, ref) => (
  <div>
    <input ref={ref} type="text" />
    <button>{props.children}</button>
  </div>
));

// 父组件中使用子组件的 ref
function RefTest() {
  const ref = useRef();
  const handleClick = useCallback(() => ref.current.focus(), [ ref ]);

  return (
    <div>
      <FancyButton ref={ref}>Click Me</FancyButton>
      <button onClick={handleClick}>获取焦点</button>
    </div>
  )
}
export default   RefTest
