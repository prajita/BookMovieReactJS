import React from 'react';
import '../App.css';

function SpinnerComponent({ ...props }) {

    return (
        <div className='busy-indicator' >
            <div className='busy-background'></div>
            <h2>{props.message}</h2>
            <div className='busy-icon'>
                <i className='fa fa-cog fa-spin fa-3x fa-fw'></i>
            </div>
        </div>
    )

}
export default SpinnerComponent;