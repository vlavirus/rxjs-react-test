import React from 'react';

import style from './Viewer.module.css'

const Viewer = ({state, sensorsNames = []}) => {
    return (
        <section>
            <div className={style.wrapper}>
                <div className={style.dashboard}>
                    <h1 className={style.title}>dashboard</h1>
                    <div className={style.data}>
                        {state.map((item, idx) => {
                            return <div key={idx} className={style.sensor}>
                                        <h2>{sensorsNames[idx]}</h2>
                                        <div key={idx}>{item}</div>
                                    </div>
                        })}
                    </div>
                </div>
          
            </div>
        </section>
    )
}

export { Viewer };