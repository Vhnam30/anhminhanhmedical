import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Jpd300pa.module.scss";
import { product } from "../../../assets/img";

// Dữ liệu sản phẩm
const PRODUCT = {
  id: "jumper-jpd-300pa",
  tag: "Sản phẩm nổi bật",
  name: (
    <>
      MÁY CTG <span className={styles.highlight}>KHÔNG DÂY</span> JUMPER
      JPD-300Pa
    </>
  ),
  brand: "JUMPER - Angelsounds",
  description:
    "Máy theo dõi tim thai và cơn co tử cung (CTG) cao cấp với đầu dò không dây hiện đại. Thiết kế tối ưu cho phòng khám, mang lại sự thoải mái cho thai phụ và độ chính xác cao cho bác sĩ.",

  specs: [
    "Theo dõi nhịp tim thai (FHR): 50 - 210 nhịp/phút (±2 bpm)",
    <>
      <span className={styles.highlight}>
        Tự động bắt cử động thai bằng đầu dò cơn gò tử cung
      </span>{" "}
    </>,

    "Tần số đầu dò: 1.0MHz ± 5%, công suất siêu âm < 5mW/cm²",
    "Theo dõi cơn co tử cung (TOCO): 0 - 100 đơn vị (±10%)",
    "Đầu dò không dây - Công nghệ Doppler xung đa tinh thể",
    "Tự động bắt cử động thai (Auto Fetal Movement)",
    "Giới hạn cảnh báo FHR cao: 160/170/180/190 bpm",
    "Giới hạn cảnh báo FHR thấp: 90/100/110/120 bpm",
    "Nguồn điện: AC 100V - 240V, 50/60Hz, công suất < 70W",
    "Kích thước: 307 × 296 × 104 mm - Trọng lượng: 4Kg",
    "Bảo hành chính hãng, phân phối độc quyền Angelsounds",
  ],

  certifications: ["Bộ Y Tế VN", "CE", "ISO 13485"],
  price: "Liên hệ để nhận báo giá",
  icon: "📟",
};

function Jpd300pa() {
  const [activeTab, setActiveTab] = useState("specs");
  const navigate = useNavigate();

  // Hàm chuyển hướng sang trang Liên hệ
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
              aria-label="Máy CTG JUMPER JPD-300Pa"
            >
              <img
                src={product}
                alt={PRODUCT.name}
                className={styles.productImage}
              />
              <div className={styles.certBadge}>✅ Không dây</div>
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
                      Thiết kế không dây – Giải pháp tối ưu cho phòng khám hiện
                      đại
                    </strong>
                  </p>
                  <ul className={styles.specsList}>
                    <li className={styles.specItem}>
                      • Loại bỏ hoàn toàn dây cáp vướng víu, tiết kiệm không
                      gian
                    </li>
                    <li className={styles.specItem}>
                      • Thai phụ có thể thay đổi tư thế, đi lại nhẹ nhàng trong
                      lúc đo
                    </li>
                    <li className={styles.specItem}>
                      • Độ nhạy cao, bắt chính xác cơn gò tử cung (TOCO)
                    </li>
                    <li className={styles.specItem}>
                      • Tự động ghi nhận cử động thai nhi (Auto Fetal Movement)
                    </li>
                    <li className={styles.specItem}>
                      • Phân phối độc quyền Angelsounds (Tập đoàn JUMPER) tại
                      Việt Nam
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

export default Jpd300pa;
