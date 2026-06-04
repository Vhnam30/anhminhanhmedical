// ============================================================
// Certificates.js – Chứng nhận & Giấy phép
// - Background màu xanh chủ đạo (#20733b)
// - 5 loại chứng nhận dạng card
// ============================================================
import React from 'react';
import styles from './Certificates.module.scss';

const CERTS = [
  {
    icon: '📋',
    title: 'Giấy phép Bộ Y Tế',
    desc: 'Số đăng ký lưu hành thiết bị y tế theo Thông tư 46/2017/TT-BYT và các quy định hiện hành',
    // badge: 'TTBYT Loại C',
  },
  {
    icon: '🌐',
    title: 'Chứng nhận ISO 13485',
    desc: 'Hệ thống quản lý chất lượng thiết bị y tế theo tiêu chuẩn quốc tế ISO 13485:2016',
    badge: 'ISO 13485:2016',
  },
  {
    icon: '🇪🇺',
    title: 'CE Mark – Châu Âu',
    desc: 'Tất cả thiết bị đạt tiêu chuẩn an toàn y tế Liên minh Châu Âu CE/MDR 2017/745',
    badge: 'CE MDR 2017',
  },
  {
    icon: '🏅',
    title: 'FDA Clearance – Mỹ',
    desc: 'Nhiều sản phẩm cao cấp được Cục Quản lý Thực phẩm và Dược phẩm Hoa Kỳ cấp phép',
    badge: 'FDA 510(k)',
  },
  
];

function Certificates() {
  return (
    <section className={styles.section} id="certs">
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>Chứng nhận &amp; Giấy phép</span>
          <h2 className={styles.title}>Uy Tín Được Xác Nhận</h2>
          <div className={styles.divider} aria-hidden="true" />
          <p className={styles.subtitle}>
            Mọi thiết bị phân phối bởi Anh Minh Anh đều có đầy đủ giấy phép hợp lệ
            theo quy định của Bộ Y Tế Việt Nam và tiêu chuẩn quốc tế uy tín nhất.
          </p>
        </div>

        {/* Grid chứng nhận */}
        <div className={styles.grid} role="list">
          {CERTS.map((cert) => (
            <article key={cert.title} className={styles.card} role="listitem">
              <div className={styles.cardIcon} aria-hidden="true">{cert.icon}</div>
              <h3 className={styles.cardTitle}>{cert.title}</h3>
              <p className={styles.cardDesc}>{cert.desc}</p>
              <span className={cert.badge ? styles.badge : ''}>
                {cert.badge}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificates;