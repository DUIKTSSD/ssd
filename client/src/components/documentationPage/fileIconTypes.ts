import pdfImage from '../../assets/pdf1.png';
import docxImage from '../../assets/docx.png';

export const getMimeTypeFromBase64 = (base64Data: string): string => {
    if (base64Data.startsWith('JVBER')) return 'application/pdf'; // PDF
    if (base64Data.startsWith('UEsDB')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
};

// Функція для визначення іконки файлу на основі MIME-типу
export const getIconType = (base64Data: string): string => {
    const mimeType = getMimeTypeFromBase64(base64Data);
    if (mimeType === 'application/pdf') return <string>pdfImage;
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return <string>docxImage;
};