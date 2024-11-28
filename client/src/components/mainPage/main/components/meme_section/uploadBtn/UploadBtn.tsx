// UploadBtn.tsx
import React, {useState} from 'react';
import styles from '../meme.module.scss';
import Swal from 'sweetalert2';

interface UploadBtnProps {
    onFileUpload: (file: File) => void;
}

const UploadBtn: React.FC<UploadBtnProps> = ({onFileUpload}) => {
    const [btnText, setBtnText] = useState('Нехай світ оцінить твій гумор :)');

 const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const result = await Swal.fire({
      title: 'Ви впевнені?',
      text: 'Це дію не можна буде скасувати!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Так, завантажити!',
      cancelButtonText: 'Відмінити',
    });
    if (result.isConfirmed) {
        await onFileUpload(file);
    }
  }
};



    const triggerFileInput = () => {
        document.getElementById('fileInput')?.click();
    };

    return (
        <div className={styles.meme__btncontainer}>
            <button
                className={styles.meme__uploadBtn}
                onMouseEnter={() => setBtnText('ЗАВАНТАЖИТИ')}
                onMouseLeave={() => setBtnText('Нехай світ оцінить твій гумор :)')}
                onClick={triggerFileInput}
            >
                {btnText}
            </button>
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{display: 'none'}}
                onChange={handleFileUpload}
            />
        </div>
    );
};

export default UploadBtn;
