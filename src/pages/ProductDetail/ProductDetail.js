import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/api';
import styles from './ProductDetail.module.scss';

const ProductDetails = () => {
  const { slug } = useParams();
  
  const [product, setProduct] = useState(null);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.getProductDetail(slug);
        const data = res.data;

        if (data && data.success) {
          setProduct(data.product);
          setDetail(data.detail || {});
          setCurrentImageIndex(0);
        } else {
          setError("Không tìm thấy thông tin sản phẩm");
        }
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setError(err.response?.data?.message || "Lỗi khi tải dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  if (loading) return <div className={styles.detailLoading}>Đang tải thông tin chi tiết...</div>;
  if (error || !product) return <div className={styles.detailError}>{error || "Sản phẩm không tồn tại!"}</div>;

  // Gom ảnh từ sản phẩm chính và ảnh chi tiết nếu có
  const images = (detail.images && detail.images.length > 0) 
    ? detail.images 
    : (product.images && product.images.length > 0 ? product.images : ['https://via.placeholder.com/600x600?text=No+Image']);

  return (
    <div className={styles.productDetailContainer}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/">Trang chủ</Link> / <Link to="/san-pham">Sản phẩm</Link> / <span>{product.name}</span>
      </div>

      <div className={styles.detailMainGrid}>
        {/* Gallery ảnh */}
        <div className={styles.detailGallery}>
          <div className={styles.mainImageBox}>
            <img src={images[currentImageIndex]} alt={product.name} className={styles.mainImage} />
          </div>
          
          {images.length > 1 && (
            <div className={styles.thumbnailList}>
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.thumbnailItem} ${idx === currentImageIndex ? styles.active : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={img} alt={`thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thông tin chính */}
        <div className={styles.detailInfo}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <div className={styles.brandBadge}>Thương hiệu: <strong>{product.brand}</strong></div>
          
          <div className={styles.priceBox}>
            <span className={styles.priceLabel}>Giá niêm yết:</span>
            <span className={styles.priceValue}>
              {detail.price || (product.price ? `${Number(product.price).toLocaleString('vi-VN')} VNĐ` : 'Liên hệ báo giá')}
            </span>
          </div>

          <div className={styles.shortDesc}>
            <h3>Mô tả tóm tắt:</h3>
            <p>{product.description}</p>
          </div>

          {detail.warranty && <p><strong>Bảo hành:</strong> {detail.warranty}</p>}
          {detail.origin && <p><strong>Xuất xứ:</strong> {detail.origin}</p>}

          <div className={styles.actionButtons}>
            <a href="tel:0900000000" className={styles.btnCall}>📞 Gọi tư vấn ngay</a>
            <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className={styles.btnZalo}>💬 Nhắn tin Zalo</a>
          </div>
        </div>
      </div>

      {/* Thông số kỹ thuật & Chi tiết mảng (specs, advantages, certifications) */}
      <div className={styles.detailTabs}>
        <div className={styles.tabHeader}>
          <h2>Mô Tả Chi Tiết & Thông Số Kỹ Thuật</h2>
        </div>
        <div className={styles.tabContent}>
          
          {/* Thông số kỹ thuật (dạng Array từ Backend) */}
          {detail.specs && detail.specs.length > 0 && (
            <div className={styles.sectionBlock}>
              <h3>Thông số kỹ thuật:</h3>
              <ul>
                {detail.specs.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Ưu điểm nổi bật */}
          {detail.advantages && detail.advantages.length > 0 && (
            <div className={styles.sectionBlock}>
              <h3>Ưu điểm nổi bật:</h3>
              <ul>
                {detail.advantages.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Chứng nhận */}
          {detail.certifications && detail.certifications.length > 0 && (
            <div className={styles.sectionBlock}>
              <h3>Chứng nhận & Tiêu chuẩn:</h3>
              <ul>
                {detail.certifications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Mô tả dài */}
          {detail.longDescription && (
            <div className={styles.fullDescription}>
              <h3>Chi tiết sản phẩm:</h3>
              <p>{detail.longDescription}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;