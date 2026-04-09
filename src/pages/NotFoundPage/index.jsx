import { Link } from 'react-router-dom';
import { BtnCard } from '../../components/BtnCard';
import { figmaAssets } from '../../assets/figmaAssets';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => (
  <div className="pageContent">
    <div className={`container ${styles.page}`}>
      <div className={styles.visual}>
        <img className={styles.digit} src={figmaAssets.notFoundDigit} alt="4" />
        <img className={styles.pot} src={figmaAssets.notFoundPot} alt="" />
        <img className={styles.digit} src={figmaAssets.notFoundDigit} alt="4" />
      </div>
      <div className={styles.copy}>
        <h1>Page Not Found</h1>
        <p>We’re sorry, the page you requested could not be found. Please go back to the homepage.</p>
        <BtnCard as={Link} to="/">
          Go Home
        </BtnCard>
      </div>
    </div>
  </div>
);
