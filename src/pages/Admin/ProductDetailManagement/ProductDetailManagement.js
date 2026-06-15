import React, { useState, useEffect } from 'react';
import api from '../../../api/api.js';   // ← Điều chỉnh đường dẫn nếu folder api nằm khác
import styles from './ProductDetailManagement.module.scss';

function ProductDetailManagement() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [detailData, setDetailData] = useState({
    tag: 'Sản phẩm nổi bật',
    longDescription: '',
    specs: [],
    advantages: [],
    certifications: [],
    price: 'Liên hệ để nhận báo giá',
    warranty: 'Bảo hành chính hãng',
    origin: '',
    images: []
  });

  const [newImages, setNewImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Load danh sách sản phẩm khi component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.getProducts();
      setProducts(res.data.products || []);
    } catch (err) {
      console.error('Lỗi tải danh sách sản phẩm:', err);
      alert('Không thể tải danh sách sản phẩm từ server. Vui lòng kiểm tra backend.');
    } finally {
      setLoading(false);
    }
  };

  const loadDetail = async (slug) => {
    try {
      setLoading(true);
      const res = await api.getProductDetail(slug);
      
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
          images: d.images || []
        });
      } else {
        // Reset nếu chưa có detail
        setDetailData({
          tag: 'Sản phẩm nổi bật',
          longDescription: '',
          specs: [],
          advantages: [],
          certifications: [],
          price: 'Liên hệ để nhận báo giá',
          warranty: 'Bảo hành chính hãng',
          origin: '',
          images: []
        });
      }

      setNewImages([]);
      setPreviewUrls([]);
    } catch (err) {
      console.error('Lỗi tải chi tiết sản phẩm:', err);
      alert('Không thể tải chi tiết sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setNewImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSaveDetail = async () => {
    if (!selectedProduct) {
      return alert("Vui lòng chọn một sản phẩm trước khi lưu!");
    }

    const formData = new FormData();

    formData.append('tag', detailData.tag);
    formData.append('longDescription', detailData.longDescription);
    formData.append('specs', detailData.specs.join('\n'));
    formData.append('advantages', detailData.advantages.join('\n'));
    formData.append('certifications', detailData.certifications.join('\n'));
    formData.append('price', detailData.price);
    formData.append('warranty', detailData.warranty);
    formData.append('origin', detailData.origin);

    // Thêm ảnh mới
    newImages.forEach(file => {
      formData.append('images', file);
    });

    try {
      setSaving(true);
      await api.saveProductDetail(selectedProduct, formData);
      
      alert('✅ Cập nhật chi tiết sản phẩm thành công!');
      loadDetail(selectedProduct); // Tải lại dữ liệu
    } catch (error) {
      console.error(error);
      alert('❌ Lỗi khi lưu: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setDetailData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.container}>
      <h2>Quản lý Chi tiết Sản phẩm</h2>

      <div className={styles.mainGrid}>
        {/* Danh sách sản phẩm */}
        <div className={styles.productList}>
          <h3>Danh sách Sản phẩm ({products.length})</h3>
          
          {loading && !selectedProduct && <p>Đang tải danh sách...</p>}

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
            <h3>Chỉnh sửa chi tiết: <span>{selectedProduct}</span></h3>

            {/* Phần upload ảnh */}
            <div className={styles.imageSection}>
              <h4>Ảnh chi tiết sản phẩm (tối đa 5 ảnh)</h4>
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
                  <h5>Ảnh mới chọn:</h5>
                  {previewUrls.map((url, i) => (
                    <img key={i} src={url} alt={`preview-${i}`} className={styles.previewImage} />
                  ))}
                </div>
              )}

              {/* Ảnh hiện có */}
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

            {/* Các trường thông tin */}
            <input 
              type="text" 
              placeholder="Tag" 
              value={detailData.tag} 
              onChange={(e) => handleInputChange('tag', e.target.value)}
              className={styles.input}
            />

            <textarea 
              placeholder="Mô tả dài..." 
              value={detailData.longDescription} 
              onChange={(e) => handleInputChange('longDescription', e.target.value)}
              rows={6}
              className={styles.textarea}
            />

            <h4>Thông số kỹ thuật (mỗi dòng một thông số)</h4>
            <textarea 
              value={Array.isArray(detailData.specs) ? detailData.specs.join('\n') : ''}
              onChange={(e) => handleInputChange('specs', e.target.value.split('\n'))}
              rows={10}
              className={styles.textarea}
            />

            <h4>Ưu điểm nổi bật (mỗi dòng một ưu điểm)</h4>
            <textarea 
              value={Array.isArray(detailData.advantages) ? detailData.advantages.join('\n') : ''}
              onChange={(e) => handleInputChange('advantages', e.target.value.split('\n'))}
              rows={8}
              className={styles.textarea}
            />

            <h4>Chứng nhận (mỗi dòng một chứng nhận)</h4>
            <textarea 
              value={Array.isArray(detailData.certifications) ? detailData.certifications.join('\n') : ''}
              onChange={(e) => handleInputChange('certifications', e.target.value.split('\n'))}
              rows={6}
              className={styles.textarea}
            />

            <input 
              type="text" 
              placeholder="Giá" 
              value={detailData.price} 
              onChange={(e) => handleInputChange('price', e.target.value)}
              className={styles.input}
            />

            <input 
              type="text" 
              placeholder="Bảo hành" 
              value={detailData.warranty} 
              onChange={(e) => handleInputChange('warranty', e.target.value)}
              className={styles.input}
            />

            <input 
              type="text" 
              placeholder="Xuất xứ" 
              value={detailData.origin} 
              onChange={(e) => handleInputChange('origin', e.target.value)}
              className={styles.input}
            />

            <button 
              onClick={handleSaveDetail} 
              className={styles.saveBtn}
              disabled={saving}
            >
              {saving ? 'Đang lưu...' : '💾 Lưu Chi Tiết Sản Phẩm'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailManagement;