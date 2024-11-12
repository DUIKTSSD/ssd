import React, {useState} from 'react';
import styles from './newsform.module.scss'
import {addNews} from "../../../../features/news/newsSlice.ts";


import iconPath from '../../../../assets/jpeg-icon.svg';
import Cross from "../../../../modules/cross/Cross.tsx";
import {useAppDispatch} from "../../../../hooks/reduxhooks.ts";
const NewsForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [isUploadDisabled, setIsUploadDisabled] = useState<boolean>(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file) {
            const newImages = Array.from(file).map(file => URL.createObjectURL(file))
            setImages(prevImages => [...prevImages, ...newImages])
        }
    };

    const handleDeleteImage = (index: number) =>  {
        const newImages = [...images];
        console.log('meow')
        newImages.splice(index, 1);
        setImages(newImages);

        setIsUploadDisabled(true)
        setTimeout(() => setIsUploadDisabled(false), 50)
    }

    const handleSubmit = () => {
        const newsData = {
            title,
            content,
            images,

        }

        dispatch(addNews(newsData))
    }

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
                        {images.map((imgSrc, index) => (
                            <div
                                key={index}
                                className={styles['image-container']}
                                style={{ backgroundImage: `url(${imgSrc})` }} // Исправлено: добавлен url() для backgroundImage
                            >
                                <Cross onClick={() => handleDeleteImage(index)} className={styles['img-container-delete']}/>
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        disabled={isUploadDisabled}
                        id="fileUpload"
                        accept="image/jpeg, image/png"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
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
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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