import React, {useState} from 'react';
import styles from "./adminSearch.module.scss";
const AdminSearch: React.FC = () => {
    const [searchItem, setSearchItem] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target.value)
    }

    const clearSearch = () => {
        setSearchItem("")
    }

    return (
        <div className={styles.adminSearch}>

            <input
                type="text"
                value={searchItem}
                onChange={handleInputChange}
                placeholder="Search..."
                className={styles.adminSearch__input}
            />

            {searchItem && (
                <button onClick={clearSearch} className={styles.adminSearch__clearBtn}>
                    Clear
                </button>
            )}
        </div>
    );
};

export default AdminSearch