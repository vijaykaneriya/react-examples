import React from 'react';

export  const Input = ( props ) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                {...props}
                 />;
            break;
        case ('textarea'):
            inputElement = <textarea
                {...props}
                    />;
            break;
        default:
            inputElement = <input
                {...props}
                 />;
            break;
    }
    return (
        <div >
            <label>{props.label}</label>
            {inputElement}
        </div>
    );

};
