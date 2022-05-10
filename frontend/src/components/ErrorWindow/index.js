import React from 'react';

const ErrorWindow = ({errors, closeErrors}) => {
    return(
        <ul>
            {errors.map(error => {
                let errorMessage;
                if (typeof error === 'string') {
                    errorMessage = error
                } else if (error.message) {
                    errorMessage = error.message
                } else {
                    errorMessage = 'there was an unknown error with your request'
                }
                return(
                    <li key={errorMessage}>{errorMessage}</li>
                )
            })}
        </ul>
    )
}
export default ErrorWindow;
