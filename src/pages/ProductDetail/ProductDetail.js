import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.module.scss';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://anhminhanhmedical-backend.onrender.com';

const ProductDetails = () => {
  const { slug } = useParams();
  
  const [product, setProduct] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/product-details/${slug}`);
        
        if (res.data.success) {
          setProduct(res.data.product);
          setDetail(res.data.detail || {});
          setCurrentImageIndex(0);
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

  if (loading) return <div className="detail-loading">Đang tải thông tin chi tiết sản phẩm...</div>;
  if (error || !product) return <div className="detail-error">{error || "Sản phẩm không tồn tại!"}</div>;

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://via.placeholder.com/600x600?text=No+Image'];

  return (
    <div className="product-detail-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link> / <Link to="/san-pham">Sản phẩm</Link> / <span>{product.name}</span>
      </div>

      <div className="detail-main-grid">
        {/* Gallery bên trái */}
        <div className="detail-gallery">
          <div className="main-image-box">
            <img 
              src={images[currentImageIndex]} 
              alt={product.name} 
              className="main-image"
            />
          </div>
          
          {images.length > 1 && (
            <div className="thumbnail-list">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail-item ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thông tin chính bên phải */}
        <div className="detail-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="brand-badge">Thương hiệu: <strong>{product.brand}</strong></div>
          
          <div className="price-box">
            <span className="price-label">Giá niêm yết:</span>
            <span className="price-value">
              {product.price ? `${product.price.toLocaleString('vi-VN')} VNĐ` : 'Liên hệ báo giá'}
            </span>
          </div>

          <div className="short-desc">
            <h3>Mô tả tóm tắt:</h3>
            <p>{product.description}</p>
          </div>

          <div className="action-buttons">
            <a href="tel:0900000000" className="btn-call">
              📞 Gọi tư vấn ngay
            </a>
            <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" className="btn-zalo">
              💬 Nhắn tin Zalo
            </a>
          </div>
        </div>
      </div>

      {/* Thông số kỹ thuật & Chi tiết */}
      <div className="detail-tabs">
        <div className="tab-header">
          <h2>Mô Tả Chi Tiết & Thông Số Kỹ Thuật</h2>
        </div>
        <div className="tab-content">
          {detail.specifications && Object.keys(detail.specifications).length > 0 ? (
            <table className="specs-table">
              <tbody>
                {Object.entries(detail.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="spec-name">{key}</td>
                    <td className="spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Thông số kỹ thuật đang được cập nhật...</p>
          )}

          {detail.fullDescription && (
            <div className="full-description">
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