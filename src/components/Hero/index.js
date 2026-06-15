import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';
import { heroBanner } from '../../assets/img/heroBanner/index.js';
// Dữ liệu thống kê
const STATS = [
  { value: '50+', label: 'Thiết bị bàn giao' },
  { value: '10+', label: 'Bệnh viện tin dùng' },
  { value: '24/7', label: 'Hỗ trợ kỹ thuật' },
];

// Danh sách hình ảnh background auto-slide
const HERO_IMAGES = [
  heroBanner[0],
  heroBanner[1],
  heroBanner[2]
];

function Hero() {
  const [visible, setVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto slide background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // 5 giây chuyển ảnh

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Giới thiệu công ty">
      {/* Background Image Slider */}
      <div className={styles.bgSlider}>
        {HERO_IMAGES.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Hero background ${index + 1}`}
            className={`${styles.bgImage} ${index === currentImageIndex ? styles.active : ''}`}
          />
        ))}
      </div>

      {/* Overlay tối */}
      <div className={styles.overlay} />

      {/* Decorations */}
      <div className={styles.bgPattern} aria-hidden="true" />
      <div className={styles.bgCircle1} aria-hidden="true" />
      <div className={styles.bgCircle2} aria-hidden="true" />

      <div className={`${styles.content} ${visible ? styles.visible : ''}`}>
        {/* Cột trái: Text + CTA */}
        <div className={styles.textCol}>
          <div className={styles.badge} role="note">
            🏅 Được cấp phép bởi Bộ Y Tế Việt Nam
          </div>

          <h1 className={styles.heading}>
            Thiết Bị Y Tế{' '}
            <em className={styles.highlight}>Chính Hãng</em>
            <br />– Chất Lượng
            <br />Tiêu Chuẩn Quốc Tế
          </h1>

          <p className={styles.slogan}>
            Anh Minh Anh cung cấp thiết bị y tế hiện đại, đạt chuẩn Bộ Y Tế,
            phục vụ bệnh viện và phòng khám toàn quốc với đội ngũ kỹ thuật
            chuyên nghiệp và dịch vụ hậu mãi tận tâm.
          </p>

          <div className={styles.ctaRow}>
            <Link to="/san-pham" className={styles.btnPrimary}>
              🔬 Tìm hiểu sản phẩm
            </Link>
            <Link to="/lien-he" className={styles.btnOutline}>
              Liên hệ ngay →
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.statsRow} role="list" aria-label="Thống kê nổi bật">
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat} role="listitem">
                <strong className={styles.statValue}>{s.value}</strong>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;