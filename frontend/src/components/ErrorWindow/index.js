import React from 'react';

const ErrorWindow = ({errors, closeErrors}) => {
    return(
        <ul>
            {errors.map(error => {
                const errorMessage = error.message ? error.message : 'generic server error'
                return(
                    <li>{errorMessage}</li>
                )
            })}
            <li></li>
        </ul>
    )
}
export default ErrorWindow;
