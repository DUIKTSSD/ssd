const handleOpenPdf = (base64Data,name) => {
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
    const blob = new Blob([byteArray], { type: mimeType });

    if (mimeType === 'application/pdf') {
        // Если это PDF, открываем его в новой вкладке
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
        URL.revokeObjectURL(blobUrl);
    } else {

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${name}.docx`; // Имя файла по умолчанию
        link.click();
        URL.revokeObjectURL(link.href);
    }
};

export default handleOpenPdf;