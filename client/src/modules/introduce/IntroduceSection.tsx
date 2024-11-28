import React from 'react';
import styles from './introduce.module.scss'

interface IntroduceProps {
    title: string;
    subtitle?: string
}

const IntroduceSection:React.FC<IntroduceProps> = ({title, subtitle}) => {
    return (
        <div className={styles.introduce}>
            <div className={styles.introduce__container}>
                <h1 className={styles.introduce__title}>
                    {title}
                </h1>

                {subtitle && (
                    <p className={styles.introduce__subtitle}>
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default IntroduceSection;