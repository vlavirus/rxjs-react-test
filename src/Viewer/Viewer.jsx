import React from 'react';

import style from './Viewer.module.css'

const Viewer = ({state}) => {
    return (
        <section>
            <div className={style.wrapper}>
                <h1>{state}</h1>
            </div>
        </section>
    )
}

export default Viewer;