import React from 'react';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';

const ActivitySpinner = ({size, color, animating, loadingError}) => {
    function renderErrorMsg() {
        if (loadingError){
            return (
                <div style={{ textAlign: 'center' }}>
                <Spinner
                    size={size || 20}
                    color={color || 'red'}
                    animating={animating || true}
                />
                <h4>Algo salió mal, verifica tu conexión a Internet y reintenta</h4>
                </div>
            );
        } else {
            return (
                <div style={{ textAlign: 'center' }}>
                <Spinner
                    size={size || 20}
                    color={color || 'gray'}
                    animating={animating || true}
                />
                </div>
            );
        }
    }
    return(<div>{renderErrorMsg()}</div>);
};

export default ActivitySpinner;