import React from "react";
import classes from './authbtn.module.scss';

interface AuthorizationButtonProps {
    btnText: string;
    disabled?: boolean;
}

const AuthorizationButton: React.FC<AuthorizationButtonProps> = ({btnText}) => {
    return (
        <button className={classes.authBtn}>
            {btnText}
            <span className={classes.authBtn__inner}>
                <span className={classes.authBtn__blobs}>
                    <span className={classes.authBtn__blob}></span>
                    <span className={classes.authBtn__blob}></span>
                    <span className={classes.authBtn__blob}></span>
                    <span className={classes.authBtn__blob}></span>
                </span>
            </span>
        </button>
    );
};

export default AuthorizationButton;
