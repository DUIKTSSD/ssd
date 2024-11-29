import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from "./navbar.module.scss";
import {decodeToken} from "../../api/decodeToken.ts";
import Swal from "sweetalert2";
import {useAppDispatch} from "../../hooks/reduxhooks.ts";
import {logoutUser} from "../../features/auth/authSlice.ts";

const UserStatus = () => {
    const userData = decodeToken();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const logout = () => {
        Swal.fire({
            title: 'Ви впевнені, що хочете вийти?',
            text: "Ми будемо чекати на вас!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Так, вийти!',
            cancelButtonText: 'Скасувати',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logoutUser())
                navigate('/')
            }
        });
    };
    return (
        <div>
            {userData ? (
                <button className={styles.navbar__auth_btn} title="Натисни, щоб вийти з аккаунта" onClick={logout}>
                    {userData.username}
                </button>
            ) : (
                <Link to="/signup">
                    <button className={styles.navbar__auth_btn}>
                        Вхід/Реєстрація
                    </button>
                </Link>
            )}
        </div>
    );
};

export default UserStatus;