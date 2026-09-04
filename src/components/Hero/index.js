import React, { useEffect, useState } from 'react';
import styles from './Hero.module.scss';
import { heroBanner } from '../../assets/img/heroBanner/index.js';

// Danh sách hình ảnh background auto-slide
const HERO_IMAGES = [
  heroBanner[0],
  heroBanner[1],
  heroBanner[2]
];

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto slide background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // 5 giây chuyển ảnh

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Hero Banner">
      <div className={styles.bgSlider}>
        {HERO_IMAGES.map((img, index) => {
          const isActive = index === currentImageIndex;
          return (
            <div
              key={index}
              className={`${styles.slideItem} ${isActive ? styles.active : ''}`}
            >
              {/* Lớp 1: Ảnh nền phủ rộng + làm mờ (phủ kín chiều ngang) */}
              <img
                src={img}
                alt=""
                aria-hidden="true"
                className={styles.bgBlur}
              />
              {/* Lớp 2: Ảnh dọc chính rõ nét ở giữa */}
              <img
                src={img}
                alt={`Hero background ${index + 1}`}
                className={styles.bgMain}
              />
            </div>
          );
        })}
      </div>

      {/* Các lớp trang trí background */}
      <div className={styles.bgPattern} aria-hidden="true" />
      <div className={styles.bgCircle1} aria-hidden="true" />
      <div className={styles.bgCircle2} aria-hidden="true" />
    </section>
  );
}

export default Hero;