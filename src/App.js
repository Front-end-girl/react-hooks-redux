
import './App.css';
import React, { useState, useEffect } from 'react';
import UseCallback from './test/useCallback'
import CountVal from './test/count'
import { connect } from "react-redux"
import RefTest from './test/ref'
import common from './test/HOC'
import TestStore from './test/testStore'

// import HOC from './test/HOC'
// 基础 Hook

// useState
// useEffect
// useContext //共享组件的状态
// 额外的 Hook

// useReducer
// useCallback
// useMemo
// useRef
// useImperativeHandle
// useLayoutEffect
// useDebugValue



function FriendStatus(props) {
  // console.log(props)  //父组件该变量变化 子组件也能收到
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  // componentDidMount componentDidUpdate componentWillUnmount
  useEffect(() => {
    console.log('订阅', new Date().getTime())
    handleStatusChange(true)
    // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      console.log('取消', new Date().getTime())
      handleStatusChange(false)
      // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}






function Form() { //维护各自的state
  // 1. Use the name state variable
  const [name] = useState('Mary');
  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    console.log('effect1')
    localStorage.setItem('formData', name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    console.log('effect2')
    document.title = name + ' ' + surname;
  });
  return (
    <div onClick={() => setSurname(surname + 1)}>form 组件</div> //两个effect都执行
  )
  // ...
}

const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      console.log(status)
      setIsOnline(status);
    }
    handleStatusChange(true)

    // ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      // handleStatusChange(false)
      // ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline ? friendID + '在线' : friendID + '隐身';
}

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
  console.log('isRecipientOnline', isRecipientOnline)

  return (
    <div style={{ marginTop: '30px' }}>
      isRecipientOnline--{recipientID}--{isRecipientOnline}
      <div>
        <select
          value={recipientID}
          onChange={e => setRecipientID(Number(e.target.value))}
        >

          {friendList.map(friend => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
        </select>
      </div>
      <UseCallback></UseCallback>
    </div>
  );
}

function TestCom(props) {
  console.log(props)
  // componentDidMount componentDidUpdate componentWillUnmount
  useEffect(() => {
    console.log('我是test 组件')
  });

  return '我是test组件'
}

const PCom = common(TestCom, { a: 1 }) //高阶组件传参数


function App({ articles }) {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setcount] = useState(0);
  const [count1, setcount1] = useState(1);
  // Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React

  // componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途
  // React 组件中有两种常见副作用操作：需要清除的和不需要清除的。
  useEffect(() => {
    console.log('父组件')
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
    document.title = `You clicked ${count1} times`;


  }, [count, count1]) //第二个参数 仅在更新不同时调用effect []空数组则才有挂载时调用
  return (
    <div>

      <FriendStatus count={count}></FriendStatus>
      <Form></Form>
      <p>You clicked {count} times</p>
      <div>{count1}</div>
      <button onClick={() => setcount1(count1 + 1)}>
        Click me count1
      </button>
      <button onClick={() => setcount(count + 1)}>
        Click me
      </button>
      <ChatRecipientPicker></ChatRecipientPicker>
      <TestCom></TestCom>
      <div style={{ marginTop: '40px' }}>我是CountVal组件</div>
      <CountVal></CountVal>

      <div style={{ marginTop: '40px' }}>我是RefTest组件</div>

      <RefTest></RefTest>

      <div style={{ marginTop: '40px' }}>HOC</div>
      {/* <HOC></HOC> */}
      <PCom></PCom>

      <TestStore child='1' ></TestStore>
      <div>
        我是store数据
        {articles.map(article => (
        <div key={article.id}>{article.body}</div>
      ))}
      </div>
    </div>
  );
}





// class 的写法
// class App extends React.Component {
//   render() {
//     return (
//       <div>test</div>
//     )
//   }
// }
const mapStateToProps = state => {
  return {
    articles: state.articles,
  }
}

export default connect(mapStateToProps)(App)

//hook 使用的两个规则

// 在最顶层使用Hook(不要在嵌套（div《div》）、条件（if）、循环（for）) 、、
// 只在react函数中使用

// eslint 插件 eslint-plugin-react-hooks


