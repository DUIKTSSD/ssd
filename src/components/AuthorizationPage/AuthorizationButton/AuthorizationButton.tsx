import React from "react";
import classes from './authbtn.module.scss';

interface AuthorizationButtonProps {
    btnText: string;
}

const AuthorizationButton: React.FC<AuthorizationButtonProps> = ({btnText}) => {
    return (
        <button className={classes.authButton}>
            {btnText}
        </button>
    );
};

export default AuthorizationButton;