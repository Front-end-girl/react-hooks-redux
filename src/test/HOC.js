import React, { useState } from 'react'

const HOC=(DifferenceComponent,params) => {
    function Common() {
        const [title] = useState('我是标题')
        return (
            <div style={{ margin: '40px' }}>
                <h2>{title}</h2>
                <DifferenceComponent {...params} />
            </div>
        )
    }

    return Common
}
export default HOC