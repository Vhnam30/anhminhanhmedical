import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./ProductDetail.module.scss";

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/product-details/${slug}`);
        
        console.log("📡 API Response:", res.data); // Debug

        if (res.data.success) {
          setProduct(res.data.product);
          setDetail(res.data.detail || {});
        } else {
          setError("Không tìm thấy sản phẩm");
        }
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setError("Lỗi khi tải dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  const goToContact = () => {
    navigate("/lien-he");
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Đang tải thông tin sản phẩm...</div>;
  if (error) return <div style={{ padding: '100px', textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!product) return <div style={{ padding: '100px', textAlign: 'center' }}>Không tìm thấy sản phẩm</div>;

  return (
    <section className={styles.section} id="product">
      <div className={styles.inner}>
        <div className={styles.grid}>
          
          {/* Cột trái: Hình ảnh */}
          <div className={styles.imageCol}>
            <div className={styles.imageBox} role="img" aria-label={product.name}>
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={styles.productImage}
                />
              ) : (
                <div className={styles.placeholder}>Đang cập nhật hình ảnh</div>
              )}
              <div className={styles.certBadge}>✅ Sản phẩm chính hãng</div>
            </div>
          </div>

          {/* Cột phải: Thông tin */}
          <div className={styles.infoCol}>
            <span className={styles.sectionTag}>{detail.tag || 'Sản phẩm cao cấp'}</span>
            <div className={styles.brand}>{product.brand}</div>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.description}>
              {detail.longDescription || product.description}
            </p>

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
                  {tab === "specs" ? "📋 Thông số kỹ thuật" : "🌟 Ưu điểm nổi bật"}
                </button>
              ))}
            </div>

            {/* Nội dung tab */}
            <div role="tabpanel">
              {activeTab === "specs" ? (
                <ul className={styles.specsList}>
                  {detail.specs && detail.specs.length > 0 ? (
                    detail.specs.map((spec, i) => (
                      <li key={i} className={styles.specItem}>
                        <span className={styles.checkIcon}>✓</span>
                        {spec}   {/* ← Sửa ở đây: chỉ hiển thị string */}
                      </li>
                    ))
                  ) : (
                    <p>Chưa có thông số kỹ thuật</p>
                  )}
                </ul>
              ) : (
                <div className={styles.advantages}>
                  <ul className={styles.specsList}>
                    {detail.advantages && detail.advantages.length > 0 ? (
                      detail.advantages.map((adv, i) => (
                        <li key={i} className={styles.specItem}>• {adv}</li>
                      ))
                    ) : (
                      <li>Chưa có ưu điểm nổi bật</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Giá & CTA */}
            <div className={styles.priceBlock}>
              <div className={styles.price}>{detail.price || "Liên hệ để nhận báo giá"}</div>
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

export default ProductDetail;