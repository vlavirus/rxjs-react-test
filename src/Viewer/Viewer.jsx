import React from 'react';

import style from './Viewer.module.css'

const Viewer = ({state}) => {
    return (
        <section>
            <div className={style.wrapper}>
                {state.map((item, index) => {
                    return <div key={index} className={style.data}>{item}</div>
                })}
            </div>
        </section>
    )
}

export { Viewer };