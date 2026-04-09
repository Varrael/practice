import { figmaAssets } from '../../assets/figmaAssets';
import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <h2>Contact</h2>
      <div className={styles.grid}>
        <div className={styles.row}>
          <div className={styles.infoCard}>
            <span className={styles.caption}>Phone</span>
            <a className={styles.mainValue} href="tel:+74993506604">
              +7 (499) 350-66-04
            </a>
          </div>
          <div className={`${styles.infoCard} ${styles.socialCard}`}>
            <span className={styles.caption}>Socials</span>
            <div className={styles.socials}>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
                <img src={figmaAssets.whatsapp} alt="WhatsApp" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <img src={figmaAssets.instagram} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.infoCard}>
            <span className={styles.caption}>Address</span>
            <p className={styles.mainValue}>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</p>
          </div>
          <div className={`${styles.infoCard} ${styles.hoursCard}`}>
            <span className={styles.caption}>Working Hours</span>
            <p className={styles.mainValue}>24 hours a day</p>
          </div>
        </div>
      </div>
      <div className={styles.mapBox}>
        <iframe
          className={styles.map}
          title="map"
          loading="lazy"
          src="https://www.google.com/maps?q=Dubininskaya%20Ulitsa%2096%20Moscow&z=13&output=embed"
        />
      </div>
    </div>
  </footer>
);
