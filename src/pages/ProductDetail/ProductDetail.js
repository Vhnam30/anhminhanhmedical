import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api/api.js'; // 1. Dùng instance api từ api.js
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

        // 2. Gọi hàm từ api.js (Endpoint: /api/product-details/${slug})
        const res = await api.getProductDetail(slug);
        const data = res.data;

        // 3. Linh hoạt bóc tách dữ liệu tùy theo Response Structure của Backend
        if (data) {
          // Trường hợp Backend trả về dạng { success: true, product, detail }
          // hoặc { product, productDetail }, hoặc object trực tiếp
          const mainProduct = data.product || data.data?.product || data;
          const subDetail = data.detail || data.productDetail || data.data?.detail || {};

          if (mainProduct && (mainProduct._id || mainProduct.name || mainProduct.title)) {
            setProduct(mainProduct);
            setDetail(subDetail);
            setCurrentImageIndex(0);
          } else {
            setError("Không tìm thấy thông tin sản phẩm");
          }
        } else {
          setError("Không có dữ liệu trả về từ server");
        }
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setError(err.response?.data?.message || "Lỗi khi tải dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return <div className={styles.detailLoading}>Đang tải thông tin chi tiết sản phẩm...</div>;
  }

  if (error || !product) {
    return <div className={styles.detailError}>{error || "Sản phẩm không tồn tại!"}</div>;
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://via.placeholder.com/600x600?text=No+Image'];

  return (
    <div className={styles.productDetailContainer}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/">Trang chủ</Link> / <Link to="/san-pham">Sản phẩm</Link> / <span>{product.name || product.title}</span>
      </div>

      <div className={styles.detailMainGrid}>
        {/* Gallery bên trái */}
        <div className={styles.detailGallery}>
          <div className={styles.mainImageBox}>
            <img 
              src={images[currentImageIndex]} 
              alt={product.name || 'Product Image'} 
              className={styles.mainImage}
            />
          </div>
          
          {images.length > 1 && (
            <div className={styles.thumbnailList}>
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.thumbnailItem} ${idx === currentImageIndex ? styles.active : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thông tin chính bên phải */}
        <div className={styles.detailInfo}>
          <h1 className={styles.productTitle}>{product.name || product.title}</h1>
          <div className={styles.brandBadge}>Thương hiệu: <strong>{product.brand || 'Đang cập nhật'}</strong></div>
          
          <div className={styles.priceBox}>
            <span className={styles.priceLabel}>Giá niêm yết:</span>
            <span className={styles.priceValue}>
              {product.price ? `${Number(product.price).toLocaleString('vi-VN')} VNĐ` : 'Liên hệ báo giá'}
            </span>
          </div>

          <div className={styles.shortDesc}>
            <h3>Mô tả tóm tắt:</h3>
            <p>{product.description || 'Chưa có mô tả tóm tắt.'}</p>
          </div>

          <div className={styles.actionButtons}>
            <a href="tel:0900000000" className={styles.btnCall}>
              📞 Gọi tư vấn ngay
            </a>
            <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className={styles.btnZalo}>
              💬 Nhắn tin Zalo
            </a>
          </div>
        </div>
      </div>

      {/* Thông số kỹ thuật & Chi tiết */}
      <div className={styles.detailTabs}>
        <div className={styles.tabHeader}>
          <h2>Mô Tả Chi Tiết & Thông Số Kỹ Thuật</h2>
        </div>
        <div className={styles.tabContent}>
          {detail && detail.specifications && Object.keys(detail.specifications).length > 0 ? (
            <table className={styles.specsTable}>
              <tbody>
                {Object.entries(detail.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className={styles.specName}>{key}</td>
                    <td className={styles.specValue}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Thông số kỹ thuật đang được cập nhật...</p>
          )}

          {detail && detail.fullDescription && (
            <div className={styles.fullDescription}>
              <h3>Đặc điểm nổi bật:</h3>
              <div dangerouslySetInnerHTML={{ __html: detail.fullDescription }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;