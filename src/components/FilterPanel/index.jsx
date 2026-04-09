import { Checkbox } from '../Checkbox';
import { SortSelect } from '../SortSelect';
import styles from './FilterPanel.module.css';

const preventNumberScroll = (event) => {
  event.currentTarget.blur();
};

export const FilterPanel = ({ filters, onChange, showDiscountToggle = true }) => (
  <div className={styles.panel}>
    <label className={styles.group}>
      <span>Price</span>
      <div className={styles.range}>
        <input
          name="minPrice"
          type="number"
          placeholder="from"
          value={filters.minPrice}
          onChange={onChange}
          onWheel={preventNumberScroll}
        />
        <input
          name="maxPrice"
          type="number"
          placeholder="to"
          value={filters.maxPrice}
          onChange={onChange}
          onWheel={preventNumberScroll}
        />
      </div>
    </label>

    {showDiscountToggle && (
      <label className={styles.group}>
        <span>Discounted items</span>
        <Checkbox
          name="discountOnly"
          checked={filters.discountOnly}
          onChange={onChange}
          ariaLabel="Discounted items"
        />
      </label>
    )}

    <div className={styles.group}>
      <span>Sorted</span>
      <SortSelect value={filters.sort} onChange={onChange} />
    </div>
  </div>
);
