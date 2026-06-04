import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductDetailManagement.module.scss';

function ProductDetailManagement() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [detailData, setDetailData] = useState({
    tag: 'Sản phẩm nổi bật',
    longDescription: '',
    specs: [],           
    advantages: [],      
    certifications: [],
    price: 'Liên hệ để nhận báo giá',
    warranty: 'Bảo hành chính hãng',
    origin: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadDetail = async (slug) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/product-details/${slug}`);
      setSelectedProduct(slug);
      
      if (res.data.detail) {
        const d = res.data.detail;
        setDetailData({
          tag: d.tag || 'Sản phẩm nổi bật',
          longDescription: d.longDescription || '',
          specs: Array.isArray(d.specs) ? d.specs : [],
          advantages: Array.isArray(d.advantages) ? d.advantages : [],
          certifications: Array.isArray(d.certifications) ? d.certifications : [],
          price: d.price || 'Liên hệ để nhận báo giá',
          warranty: d.warranty || 'Bảo hành chính hãng',
          origin: d.origin || ''
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveDetail = async () => {
    if (!selectedProduct) return alert("Vui lòng chọn sản phẩm");

    try {
      await axios.post(
        `http://localhost:5000/api/product-details/${selectedProduct}`,
        detailData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ Cập nhật chi tiết sản phẩm thành công!');
    } catch (error) {
      alert('❌ Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  // Xử lý thay đổi textarea
  const handleTextareaChange = (field, value) => {
    setDetailData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={styles.container}>
      <h2>Quản lý Chi tiết Sản phẩm</h2>

      <div className={styles.mainGrid}>
        {/* Danh sách sản phẩm */}
        <div className={styles.productList}>
          <h3>Danh sách Sản phẩm ({products.length})</h3>
          <ul className={styles.list}>
            {products.map(p => (
              <li 
                key={p._id} 
                onClick={() => loadDetail(p.slug)}
                className={`${styles.listItem} ${selectedProduct === p.slug ? styles.active : ''}`}
              >
                {p.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Form chỉnh sửa */}
        {selectedProduct && (
          <div className={styles.detailForm}>
            <h3>Chỉnh sửa: <span>{selectedProduct}</span></h3>

            <input 
              type="text" 
              placeholder="Tag" 
              value={detailData.tag} 
              onChange={e => setDetailData({...detailData, tag: e.target.value})}
              className={styles.input}
            />

            <textarea 
              placeholder="Mô tả dài..." 
              value={detailData.longDescription} 
              onChange={e => setDetailData({...detailData, longDescription: e.target.value})}
              rows={5}
              className={styles.textarea}
            />

            <h4>Thông số kỹ thuật (mỗi dòng một thông số)</h4>
            <textarea 
              placeholder="Màn hình: 7 inch TFT&#10;Theo dõi nhịp tim: 50-210 bpm&#10;Pin: Lithium 2200mAh&#10;Kích thước: 295 × 240 × 73 mm"
              value={Array.isArray(detailData.specs) ? detailData.specs.join('\n') : detailData.specs || ''}
              onChange={(e) => handleTextareaChange('specs', e.target.value)}
              rows={10}
              className={styles.textarea}
            />

            <h4>Ưu điểm nổi bật (mỗi dòng một ưu điểm)</h4>
            <textarea 
              placeholder="Thiết kế không dây hiện đại&#10;Kết nối Wi-Fi ổn định&#10;In biểu đồ nhiệt thời gian thực&#10;Pin hoạt động liên tục 5 giờ"
              value={Array.isArray(detailData.advantages) ? detailData.advantages.join('\n') : detailData.advantages || ''}
              onChange={(e) => handleTextareaChange('advantages', e.target.value)}
              rows={8}
              className={styles.textarea}
            />

            <button onClick={handleSaveDetail} className={styles.saveBtn}>
              💾 Lưu Chi Tiết Sản Phẩm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailManagement;