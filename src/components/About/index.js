import React from 'react';
import styles from './About.module.scss';
import { aboutBg } from '../../assets/img';

const STATS = [
  { value: '10+', label: 'Bệnh viện đối tác' },
  { value: '50+', label: 'Thiết bị bàn giao' },
  { value: '20+', label: 'Kỹ sư kỹ thuật' },
];

const VALUES = [
  { icon: '🤝', text: 'Uy tín – Minh bạch trong mọi giao dịch' },
  { icon: '💡', text: 'Chuyên nghiệp – Đội ngũ được đào tạo quốc tế' },
  { icon: '❤️', text: 'Tận tâm – Phục vụ vì sức khỏe cộng đồng' },
];

function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Cột hình ảnh */}
          <div className={styles.visualCol}>
            <div className={styles.visual}>
              <img 
                src={aboutBg} 
                alt="Trụ sở Công ty Thiết bị Y tế Anh Minh Anh" 
                className={styles.visualBg}
              />
            </div>
          </div>

          {/* Cột nội dung */}
          <div className={styles.textCol}>
            <span className={styles.tag}>Về chúng tôi</span>
            <h2 className={styles.title}>
              Đồng Hành<br />Cùng Y Tế Việt Nam
            </h2>
            <div className={styles.divider} />

            <p className={styles.desc}>
              Công ty Thiết bị y tế <strong>Anh Minh Anh</strong> được thành lập năm 2025, 
              chuyên nhập khẩu và phân phối thiết bị y tế cao cấp từ Angelsounds (Tập đoàn JUMPER) tại Việt Nam.
            </p>
            <p className={styles.desc}>
              Chúng tôi tự hào là đối tác tin cậy của hơn 10 bệnh viện và phòng khám trên toàn quốc, 
              cung cấp thiết bị đạt chuẩn, dịch vụ bảo hành chuyên nghiệp và đào tạo nhân lực tận tâm.
            </p>

            {/* Giá trị cốt lõi */}
            <div className={styles.values}>
              {VALUES.map((v, index) => (
                <div key={index} className={styles.valueItem}>
                  <span className={styles.valueIcon}>{v.icon}</span>
                  <span>{v.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
              {STATS.map((s, index) => (
                <div key={index} className={styles.stat}>
                  <strong className={styles.statValue}>{s.value}</strong>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;