import React, { memo } from 'react'
import * as actionTypes from "../store/actionTypes"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = dispatch => {
    console.log('dispatch', dispatch)
    return {
        saveArticle: article =>
            dispatch({ type: actionTypes.ADD_ARTICLE, article }),
    }
}
const TestStore = (props) => {
    const { child } = props
    const { saveArticle } = props
    function handleStore(status) {
        saveArticle({
            title: '我是新添加',
            body: '我是新添加内容',
        })
    }
    return (
        <div onClick={handleStore}>我是测试redux{child}</div>
    )
}
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(TestStore));