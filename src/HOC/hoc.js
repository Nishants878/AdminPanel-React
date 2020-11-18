import { render } from '@testing-library/react';
import React, { Children } from 'react';


const hoc =(props)=>{
    return (
        props.hoc===undefined?
        <div></div>
        :
        props.children
    )
}

export default hoc