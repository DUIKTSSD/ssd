import React from 'react';
import PopUp from "../../../../modules/popup/popUp.tsx";
import NewsForm from "../createNewsForm/NewsForm.tsx";


interface NewsPopUpProps {
    onClose: () => void;
}

const NewsPopup:React.FC<NewsPopUpProps> = ({onClose}) => {
    return (
        <PopUp title="News" onClose={onClose}>
            <NewsForm onClose={onClose}/>
        </PopUp>
    );
};

export default NewsPopup;