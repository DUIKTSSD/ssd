const buttons = [
  { key: 'intro', label: 'Документи SSD' },
  { key: 'useful-link', label: 'Корисні посилання' },
  { key: 'course-link', label: 'Курси(free)' },
];
import styles from './navButtons.module.scss';
type DocNavButtonsProps = {
  current: string;
  onChange: (key: string) => void;
};

const DocNavButtons = ({ current, onChange }: DocNavButtonsProps) => {
  return (
      <div className={styles.wrapper}>
        <div className={styles.wrapper__container}>
          {buttons.map((btn) => (

              <button
                  key={btn.key}
                  className={`${styles.button} ${current === btn.key ? styles.active : ''}`}
                  onClick={() => onChange(btn.key)}
                  disabled={current === btn.key}
              >
                {btn.label}
              </button>

            ))}
        </div> </div>
        );
        };

export default DocNavButtons;