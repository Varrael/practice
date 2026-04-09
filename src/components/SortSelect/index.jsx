import { useEffect, useRef, useState } from 'react';
import styles from './SortSelect.module.css';

const options = [
  { value: 'default', label: 'by default' },
  { value: 'newest', label: 'newest' },
  { value: 'price-desc', label: 'price: high-low' },
  { value: 'price-asc', label: 'price: low-high' },
];

export const SortSelect = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const currentOption = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (nextValue) => {
    onChange({
      target: {
        name: 'sort',
        value: nextValue,
      },
    });
    setIsOpen(false);
  };

  return (
    <div ref={rootRef} className={styles.select}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`.trim()}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{currentOption.label}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`.trim()} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className={styles.menu} role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.option} ${option.value === value ? styles.optionActive : ''}`.trim()}
              type="button"
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
