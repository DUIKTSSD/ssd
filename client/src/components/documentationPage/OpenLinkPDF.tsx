const handleOpenPdf = (base64Data) => {
    // Декодуємо Base64
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    // Перетворюємо Base64 в масив байт
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    // Створюємо Blob з масиву байт
    const blob = new Blob([byteArray], {type: 'application/pdf'});

    // Створюємо об'єкт URL для Blob
    const blobUrl = URL.createObjectURL(blob);

    // Відкриваємо PDF в новій вкладці
    window.open(blobUrl, '_blank');

    // Очищуємо URL після використання
    URL.revokeObjectURL(blobUrl);
};
export  default handleOpenPdf;