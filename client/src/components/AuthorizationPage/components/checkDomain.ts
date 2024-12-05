import Swal from "sweetalert2";

export const checkDomain = (email:string) => {
    const isValidEmail = email.includes('@stud.duikt.edu.ua');
    if (!isValidEmail) {
        Swal.fire({
            icon: 'error',
            title: 'Невірний домен',
            text: 'Потрібен домен @stud.duikt.edu.ua',
        })
    }
}