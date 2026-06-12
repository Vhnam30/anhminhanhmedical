import React from 'react';
import styles from './ServicesPage.module.scss';
import { servicePageImg } from '../../assets/img/servicePage';
import { tnetImg } from '../../assets/img/servicePage/tnetultra';

function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Dịch Vụ Của Chúng Tôi</h1>
          <p>Giải pháp toàn diện – Đồng hành cùng phòng khám sản phụ khoa từ A đến Z</p>
        </div>
      </section>

      {/* Các dịch vụ chung */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.tag}>Dịch vụ nổi bật</span>
            <h2>Giải pháp Toàn diện cho Phòng Khám</h2>
          </div>

          <div className={styles.grid}>
            {servicesData.map((service, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {service.image ? (
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className={styles.serviceImage}
                    />
                  ) : (
                    <div className={styles.icon}>{service.icon}</div>
                  )}
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TNET ULTRA - NỔI BẬT ==================== */}
      <section className={styles.tnetSection}>
        <div className={styles.container}>
          <div className={styles.tnetBadge}>✨ GIẢI PHÁP NỔI BẬT</div>
          
          <div className={styles.tnetHeader}>
            <h2>TNET ULTRA</h2>
            <h3>Phần mềm quản lý phòng khám sản phụ khoa thông minh</h3>
            <p className={styles.tnetDesc}>
              Hệ thống quản lý toàn diện – Chuyên sâu cho chuyên khoa Sản Phụ Khoa
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {tnetFeatures.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.imageWrapper}>
                  {feature.image ? (
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className={styles.featureImage}
                    />
                  ) : (
                    <div className={styles.featureIcon}>{feature.icon}</div>
                  )}
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.tnetCta}>
            <a href="/lien-he" className={styles.ctaButton}>
              Đăng ký TNET Ultra 
            </a>
            <p className={styles.note}>Hỗ trợ triển khai nhanh • Hướng dẫn sử dụng • Bảo hành dài hạn</p>
          </div>
        </div>
      </section>

      {/* CTA chung */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2>Bạn đang lên kế hoạch mở hoặc nâng cấp phòng khám?</h2>
          <a href="/lien-he" className={styles.finalCtaButton}>Liên hệ tư vấn ngay hôm nay</a>
        </div>
      </section>
    </>
  );
}

// ==================== DỮ LIỆU ====================

const servicesData = [
  {
    title: "Thiết bị Phòng khám Sản Phụ Khoa",
    desc: "Cung cấp đầy đủ thiết bị phòng khám sản phụ khoa, đặc biệt là dòng máy CTG không dây và CTG điện toán hiện đại.",
    image: servicePageImg[2] || "",
    icon: ""   // ← Để trống để bạn điền icon
  },
  {
    title: "Máy Siêu Âm Giá Ưu Đãi",
    desc: "Cung cấp các dòng máy siêu âm chính hãng với giá cạnh tranh và chính sách bảo hành tốt nhất.",
    image: servicePageImg[0] || "",
    icon: ""
  },
  {
    title: "Hỗ trợ Thủ tục Hành chính",
    desc: "Hỗ trợ hoàn thiện thủ tục thành lập phòng khám nhanh chóng, đúng quy định pháp luật.",
    image: "",
    icon: "📋"   // ← Để trống để bạn điền icon
  },
  {
    title: "Tư vấn Thuế & Kế toán",
    desc: "Tư vấn thuế hộ kinh doanh và doanh nghiệp, hỗ trợ kê khai thuế định kỳ.",
    image: "",
     icon: "💼"
  },
  {
    title: "Marketing Phòng Khám",
    desc: "Cung cấp dịch vụ marketing chuyên sâu giúp phòng khám thu hút bệnh nhân hiệu quả.",
    image: "",
    icon: "📢"
  },
  {
    title: "Thiết kế & Thi công",
    desc: "Tư vấn thiết kế và thi công phòng khám theo tiêu chuẩn y khoa, tối ưu công năng.",
    image: servicePageImg[3] || "",
    icon: ""
  },
  {
    title: "Sửa chữa Thiết bị Y tế",
    desc: "Sửa chữa các thiết bị y tế (CTG, máy nước tiểu, siêu âm...), hỗ trợ máy dự phòng.",
    image: servicePageImg[1] || "",
    icon: ""
  }
];

const tnetFeatures = [
  {
    title: "Quản lý quy trình khám bệnh khép kín",
    desc: "Từ tiếp nhận bệnh nhân → khám lâm sàng → siêu âm → xét nghiệm → kê đơn → thu ngân → tái khám.",
    image: tnetImg[0] || "",
    icon: ""   // ← Để trống để bạn điền icon
  },
  {
    title: "Hồ sơ bệnh án điện tử chuyên sâu",
    desc: "Quản lý thông tin thai kỳ, tiền sử sản khoa, bệnh án phụ khoa, nhũ hoa, hiếm muộn.",
    image: tnetImg[0] || "",
    icon: ""
  },
  {
    title: "Quản lý siêu âm & hình ảnh",
    desc: "Kết nối thiết bị siêu âm, lưu trữ và quản lý hình ảnh theo từng lần khám.",
    image: tnetImg[0] || "",
    icon: ""
  },
  {
    title: "Quản lý lịch hẹn thông minh",
    desc: "Đặt lịch, nhắc lịch, quản lý lịch bác sĩ, theo dõi tái khám.",
    image: tnetImg[0] || "",
    icon: ""
  },
  {
    title: "Kê đơn điện tử & Quản lý nhà thuốc",
    desc: "Kê đơn nhanh, quản lý tồn kho, hạn sử dụng, cảnh báo thuốc sắp hết.",
    image: tnetImg[0] || "",
    icon: ""
  },
  {
    title: "Quản lý doanh thu & Báo cáo",
    desc: "Báo cáo doanh thu, số lượng bệnh nhân, báo cáo bác sĩ, tồn kho theo thời gian thực.",
    image: tnetImg[0] || "",
    icon: ""
  },
  {
    title: "Bảo mật & Phân quyền chi tiết",
    desc: "Phân quyền theo vai trò: Lễ tân, Bác sĩ, Dược sĩ, Kế toán, Quản trị viên.",
    image: tnetImg[0] || "",
    icon: ""
  }
];

export default ServicesPage;