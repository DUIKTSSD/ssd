import React, {useState} from 'react';
import styles from './newsform.module.scss';
import {addNews} from "../../../../features/news/newsSlice.ts";
import iconPath from '../../../../assets/jpeg-icon.svg';
import Cross from "../../../../modules/cross/Cross.tsx";
import {useAppDispatch} from "../../../../hooks/reduxhooks.ts";

interface NewsFormProps {
    onClose: () => void;
}

interface NewsFormProps {
    onClose: () => void;
}

const NewsForm: React.FC<NewsFormProps> = ({onClose}) => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [isUploadDisabled, setIsUploadDisabled] = useState<boolean>(false);
    const filePreviews = files.map(file => URL.createObjectURL(file));

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList) {
            const newFiles = Array.from(fileList);
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
        }
    };

    const handleDeleteImage = (index: number) => {
        const newImages = [...files];
        console.log('meow')
        newImages.splice(index, 1);
        setFiles(newImages);
        setIsUploadDisabled(true)
        setTimeout(() => setIsUploadDisabled(false), 50)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('text', text);
        files.forEach((file) => {
            formData.append(`files`, file); // Передаем файлы
        });
        dispatch(addNews(formData));
        onClose();
    };

    return (
        <div className={styles['upload-form']}>
            <h2 className={styles['upload-form-title']}>
                Create news
            </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fileUpload" className={styles['image-upload']}>
                    <img className={styles['upload-icon']} src={iconPath} alt="icon"/>
                    <div className={styles['upload-placeholder']}>
                        <h3 className={styles['image-upload-title']}>
                            <span className={styles.blue}>Click to upload</span>
                            or drag and drop
                        </h3>
                    </div>
                    <div className={styles['image-preview-container']}>
                        {filePreviews.map((imgSrc, index) => (
                            <div
                                key={index}
                                className={styles['image-container']}
                                style={{backgroundImage: `url(${imgSrc})`}} // Use file preview URL
                            >
                                <Cross onClick={() => handleDeleteImage(index)}
                                       className={styles['img-container-delete']}/>
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        disabled={isUploadDisabled}
                        id="fileUpload"
                        accept="image/jpeg, image/png"
                        onChange={handleImageUpload}
                        style={{display: 'none'}}
                    />
                </label>
                <label htmlFor="title">Title</label>
                <input className={styles['upload-form-input-title']}
                       type="text"
                       id="title"
                       placeholder="Enter the title"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       required
                />
                <label htmlFor="content">Main text</label>
                <textarea
                    className={styles['upload-form-content']}
                    id="content"
                    placeholder="Enter the main text..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <div className={styles['upload-form-btn-wrapper']}>
                    <button className={styles['upload-form-btn']} type="submit">Upload...</button>
                </div>
            </form>
        </div>
    );
};

export default NewsForm;
