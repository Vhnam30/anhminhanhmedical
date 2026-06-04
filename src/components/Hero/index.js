// ============================================================
// Hero.js – Hero Section lớn đầu trang
// ============================================================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';

// Dữ liệu thống kê hiển thị trong hero
const STATS = [
  { value: '50+', label: 'Thiết bị bàn giao' },
  { value: '10+', label: 'Bệnh viện tin dùng' },
  { value: '24/7', label: 'Hỗ trợ kỹ thuật' },
];

function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Giới thiệu công ty">
      {/* Background dot pattern trang trí */}
      <div className={styles.bgPattern} aria-hidden="true" />
      <div className={styles.bgCircle1} aria-hidden="true" />
      <div className={styles.bgCircle2} aria-hidden="true" />

      <div className={`${styles.content} ${visible ? styles.visible : ''}`}>
        {/* ── Cột trái: Text + CTA ── */}
        <div className={styles.textCol}>
          {/* Badge chứng nhận */}
          <div className={styles.badge} role="note">
            🏅 Được cấp phép bởi Bộ Y Tế Việt Nam
          </div>

          {/* Tiêu đề chính */}
          <h1 className={styles.heading}>
            Thiết Bị Y Tế{' '}
            <em className={styles.highlight}>Chính Hãng</em>
            <br />– Chất Lượng
            <br />Tiêu Chuẩn Quốc Tế
          </h1>

          {/* Slogan mô tả */}
          <p className={styles.slogan}>
            Anh Minh Anh cung cấp thiết bị y tế hiện đại, đạt chuẩn Bộ Y Tế,
            phục vụ bệnh viện và phòng khám toàn quốc với đội ngũ kỹ thuật
            chuyên nghiệp và dịch vụ hậu mãi tận tâm.
          </p>

          {/* Nút hành động - Đã sửa dùng React Router */}
          <div className={styles.ctaRow}>
            <Link to="/san-pham" className={styles.btnPrimary}>
              🔬 Tìm hiểu sản phẩm
            </Link>
            <Link to="/lien-he" className={styles.btnOutline}>
              Liên hệ ngay →
            </Link>
          </div>

          {/* Thống kê nhanh */}
          <div className={styles.statsRow} role="list" aria-label="Thống kê nổi bật">
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat} role="listitem">
                <strong className={styles.statValue}>{s.value}</strong>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải: Visual card (giữ nguyên nếu có) */}
      </div>
    </section>
  );
}

export default Hero;