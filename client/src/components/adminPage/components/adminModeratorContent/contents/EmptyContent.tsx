import React from 'react';

import styles from "../adminModContent.module.scss"

interface EmptyContentProps {
    message?: string
}

const EmptyContent: React.FC<EmptyContentProps> = ({
    message = 'No content to moderate'}) => {
    return (
        <div className={styles.adminModContact__empty}>
            {message}
        </div>
    );
};

export default EmptyContent;