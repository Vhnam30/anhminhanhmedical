import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CtgLukComeL8pm.module.scss";

import { l8pm } from "../../../assets/img/l8pm";
// Dữ liệu sản phẩm - L8P-M (Luckcome)
const PRODUCT = {
  id: "ctg-l8p-m",
  tag: "Sản phẩm cao cấp",
  name: (
    <>
      MÁY CTG <span className={styles.highlight}>KHÔNG DÂY</span> LUCKCOME L8P-M
    </>
  ),
  brand: "LUCKCOME",
  description:
    "Máy theo dõi sản khoa cao cấp L8P-M với màn hình TFT 10.2 inch, hỗ trợ theo dõi đồng thời FHR, TOCO, FM và thai đôi. Thiết kế hiện đại, tích hợp pin Lithium, máy in nhiệt và kết nối mạng.",

  specs: [
    <>
      Màn hình<span className={styles.highlight}>cảm ứng</span>10.2 inch, độ
      phân giải 800x480
    </>,
    <>
      <span className={styles.highlight}>
        Chức năng điện toán phân tích chỉ số STV (Short-Term Variation - Dao
        động ngắn hạn) là một trong những công cụ lâm sàng tiên tiến và có giá
        trị nhát trong đo biểu đồ tim thai và cơn gò tử cung (CTG).
      </span>
    </>,

    "Theo dõi nhịp tim thai (FHR): 50~210 bpm (Doppler xung)",
    "Theo dõi cơn co tử cung (TOCO): 0~100 đơn vị",
    "Theo dõi cử động thai (FM): Thủ công & Tự động",
    "Hỗ trợ theo dõi thai đôi (FHR2)",
    "Tích hợp máy in nhiệt in biểu đồ thời gian thực",
    "Pin Lithium 14.8V 2200mAh, hoạt động 5 giờ",
    "Kết nối Wi-Fi / Ethernet với Central Station",
    "Kích thước: 295 × 240 × 73 mm - Trọng lượng: 1.75kg",
    "Nguồn điện: AC 100-240V, 50/60Hz",
  ],

  certifications: ["CE", "ISO 13485", "Bộ Y Tế VN"],
  price: "Liên hệ để nhận báo giá",
  icon: "📟",
};

function CtgLukComeL8pm() {
  const [activeTab, setActiveTab] = useState("specs");
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/lien-he");
  };

  return (
    <section className={styles.section} id="product">
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Cột trái: Hình ảnh */}
          <div className={styles.imageCol}>
            <div
              className={styles.imageBox}
              role="img"
              aria-label="Máy theo dõi sản khoa L8P-M"
            >
              <img
                src={l8pm[0]}
                alt={PRODUCT.name}
                className={styles.productImage}
              />
              <div className={styles.certBadge}>✅ Màn hình lớn 10.2"</div>
            </div>
          </div>

          {/* Cột phải: Thông tin */}
          <div className={styles.infoCol}>
            <span className={styles.sectionTag}>{PRODUCT.tag}</span>
            <div className={styles.brand}>{PRODUCT.brand}</div>
            <h2 className={styles.productName}>{PRODUCT.name}</h2>
            <p className={styles.description}>{PRODUCT.description}</p>

            {/* Tabs */}
            <div className={styles.tabRow} role="tablist">
              {["specs", "advantages"].map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "specs"
                    ? "📋 Thông số kỹ thuật"
                    : "🌟 Ưu điểm nổi bật"}
                </button>
              ))}
            </div>

            {/* Nội dung tab */}
            <div role="tabpanel">
              {activeTab === "specs" ? (
                <ul className={styles.specsList}>
                  {PRODUCT.specs.map((spec, i) => (
                    <li key={i} className={styles.specItem}>
                      <span className={styles.checkIcon}>✓</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.advantages}>
                  <p>
                    <strong>
                      Thiết bị theo dõi sản khoa chuyên sâu cho bệnh viện và
                      phòng khám
                    </strong>
                  </p>
                  <ul className={styles.specsList}>
                    <li className={styles.specItem}>
                      • Màn hình lớn 10.2 inch hiển thị rõ nét từ xa
                    </li>
                    <li className={styles.specItem}>
                      • Hỗ trợ theo dõi thai đôi và in biểu đồ nhiệt
                    </li>
                    <li className={styles.specItem}>
                      • Pin Lithium dung lượng cao, hoạt động liên tục khi mất
                      điện
                    </li>
                    <li className={styles.specItem}>
                      • Kết nối Wi-Fi/Ethernet với hệ thống trung tâm bệnh viện
                    </li>
                    <li className={styles.specItem}>
                      • Thiết kế nhỏ gọn, dễ di chuyển và sử dụng
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Giá & CTA */}
            <div className={styles.priceBlock}>
              <div className={styles.price}>{PRODUCT.price}</div>
            </div>

            <div className={styles.btnRow}>
              <button className={styles.btnGreen} onClick={goToContact}>
                🛒 Đặt hàng ngay
              </button>
              <button className={styles.btnGold} onClick={goToContact}>
                📞 Tư vấn miễn phí
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtgLukComeL8pm;
