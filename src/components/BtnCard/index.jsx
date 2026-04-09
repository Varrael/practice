import styles from './BtnCard.module.css';

export const BtnCard = ({
  as: Component = 'button',
  children,
  className = '',
  variant = 'green',
  selected = false,
  fullWidth = false,
  ...props
}) => {
  const variantClass =
    selected
      ? styles.selected
      : variant === 'banner'
        ? styles.banner
        : variant === 'white'
          ? styles.white
          : styles.green;

  const classes = [
    styles.button,
    variantClass,
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
