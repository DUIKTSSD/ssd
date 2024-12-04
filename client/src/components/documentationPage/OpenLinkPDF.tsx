import Swal from "sweetalert2";

const handleOpenPdf = (base64Data: string, name: string) => {
    // Декодируем Base64
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    // Преобразуем Base64 в массив байт
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    // Определяем MIME-тип
    const mimeType = base64Data.substring(0, 5) === 'JVBER' ? 'application/pdf' : 'application/octet-stream';

    // Создаем Blob с соответствующим типом
    const blob = new Blob([byteArray], {type: mimeType});

    if (mimeType === 'application/pdf') {
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
        URL.revokeObjectURL(blobUrl);
    } else {
        Swal.fire({
            title: 'Ви впевнені?',
            text: 'Ви хочете завантажити цей документ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Так, завантажити',
            cancelButtonText: 'Скасувати',
        }).then((result) => {
            if (result.isConfirmed) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${name}.docx`;
                link.click();
                URL.revokeObjectURL(link.href);
            }
        })
    }
};

export default handleOpenPdf;