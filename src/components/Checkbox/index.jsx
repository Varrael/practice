import styles from './Checkbox.module.css';

export const Checkbox = ({ checked, onChange, name, ariaLabel }) => (
  <label className={styles.checkboxLabel}>
    <input
      className={styles.input}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
    />
    <span className={styles.box} aria-hidden="true" />
  </label>
);
