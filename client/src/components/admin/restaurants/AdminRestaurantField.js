import React from 'react';

export default({input, label, meta:{error, touched}}) =>{
    return(
        <div>
            <label>{label}</label>
            <input {...input} />
            <div className="red-text errors">
                {touched && error}
            </div>
            
        </div>
    );
};