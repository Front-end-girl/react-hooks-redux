import React, { memo, useCallback, useState } from 'react'

function PageA(props) {
    const { onClick, children } = props
    console.log(111, props)
    return <div onClick={onClick}>{children}</div>
}

function PageB({ onClick, name }) {
    console.log(222)
    return <div onClick={onClick}>{name}</div>
}

const PageC = memo(PageB)
const PageAC = memo(PageA)

function UseCallback() {
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)

    const handleClick1 = useCallback(
        () => {
            setA(a + 1)

        }, [a]
    )

    const handleClick2 = useCallback(() => {
        console.log('顺序')
        setB(b+1)
    }, [b]) //只在b有变化触发 子组件依赖重新渲染

    return (
        <>
            <PageAC onClick={handleClick1}>{a}</PageAC>
            <PageC onClick={handleClick2} name={b} />
        </>
    )
}

export default UseCallback
// 总结：绑定在父组件的的state发生变化 子组件都要重新渲染

// 使用memo 进行比较
// 用过memo方法包裹PageB组件，并且通过useCallback包裹PageB组件的onClick方法，memo与PureComponent比较类似，前者是对Function Component的优化，后者是对Class Component的优化，
// 都会对传入组件的数据进行浅比较，useCallback则会保证handleClick2不会发生变化