import pdfImage from '../../assets/pdf1.png';
import docxImage from '../../assets/docx.png';

export const getMimeTypeFromBase64 = (base64Data: string): string => {
    if (base64Data.startsWith('JVBER')) return 'application/pdf'; // PDF
    if (base64Data.startsWith('UEsDB')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    return ''; // Optional: return an empty string for unsupported formats
};

// Function to determine file icon based on MIME type
export const getIconType = (base64Data: string): string => {
    const mimeType = getMimeTypeFromBase64(base64Data);
    if (mimeType === 'application/pdf') return pdfImage; // Return image path as a string
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return docxImage; // Return image path as a string
    return ''; // Optional: return a default image path or empty string for unsupported formats
};