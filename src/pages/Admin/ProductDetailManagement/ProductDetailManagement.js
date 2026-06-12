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
    origin: '',
    images: []           // Ảnh chi tiết
  });

  const [newImages, setNewImages] = useState([]);        // Ảnh mới chọn
  const [previewUrls, setPreviewUrls] = useState([]);    // Preview ảnh mới

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
          origin: d.origin || '',
          images: d.images || []           // Lấy ảnh từ ProductDetail
        });
      }
      setNewImages([]);
      setPreviewUrls([]);
    } catch (err) {
      console.error(err);
    }
  };

  // Xử lý chọn ảnh mới
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Giới hạn 5 ảnh
    setNewImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSaveDetail = async () => {
    if (!selectedProduct) return alert("Vui lòng chọn sản phẩm");

    const formData = new FormData();

    // Thêm các trường text
    formData.append('tag', detailData.tag);
    formData.append('longDescription', detailData.longDescription);
    formData.append('specs', detailData.specs.join('\n'));
    formData.append('advantages', detailData.advantages.join('\n'));
    formData.append('certifications', detailData.certifications.join('\n'));
    formData.append('price', detailData.price);
    formData.append('warranty', detailData.warranty);
    formData.append('origin', detailData.origin);

    // Thêm ảnh mới (nếu có)
    newImages.forEach(file => {
      formData.append('images', file);
    });

    try {
      await axios.post(
        `http://localhost:5000/api/product-details/${selectedProduct}`,
        formData,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' 
          } 
        }
      );
      alert('✅ Cập nhật chi tiết + ảnh thành công!');
      loadDetail(selectedProduct); // Load lại dữ liệu
    } catch (error) {
      alert('❌ Lỗi: ' + (error.response?.data?.message || error.message));
    }
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

            {/* Phần upload ảnh chi tiết */}
            <div className={styles.imageSection}>
              <h4>Ảnh chi tiết sản phẩm (tối đa 5)</h4>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleImageChange} 
                className={styles.fileInput}
              />

              {/* Preview ảnh mới */}
              {previewUrls.length > 0 && (
                <div className={styles.previewContainer}>
                  {previewUrls.map((url, i) => (
                    <img key={i} src={url} alt={`preview-${i}`} className={styles.previewImage} />
                  ))}
                </div>
              )}

              {/* Hiển thị ảnh hiện có */}
              {detailData.images && detailData.images.length > 0 && (
                <div>
                  <h5>Ảnh hiện tại:</h5>
                  <div className={styles.previewContainer}>
                    {detailData.images.map((url, i) => (
                      <img key={i} src={url} alt={`current-${i}`} className={styles.previewImage} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Các trường khác */}
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
              value={Array.isArray(detailData.specs) ? detailData.specs.join('\n') : ''}
              onChange={(e) => setDetailData({...detailData, specs: e.target.value.split('\n')})}
              rows={10}
              className={styles.textarea}
            />

            <h4>Ưu điểm nổi bật (mỗi dòng một ưu điểm)</h4>
            <textarea 
              value={Array.isArray(detailData.advantages) ? detailData.advantages.join('\n') : ''}
              onChange={(e) => setDetailData({...detailData, advantages: e.target.value.split('\n')})}
              rows={8}
              className={styles.textarea}
            />

            <button onClick={handleSaveDetail} className={styles.saveBtn}>
              💾 Lưu Chi Tiết Sản Phẩm (Bao gồm ảnh)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailManagement;