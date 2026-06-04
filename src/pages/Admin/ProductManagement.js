import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    category: '',
    price: '',
    featured: false
  });
  const [images, setImages] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    images.forEach(img => {
      data.append('images', img);
    });

    try {
      await axios.post('http://localhost:5000/api/products', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Tạo sản phẩm thành công!');
      fetchProducts(); // Refresh danh sách
      setFormData({ name: '', brand: '', description: '', category: '', price: '', featured: false });
      setImages([]);
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Quản lý Sản phẩm</h2>

      {/* Form tạo sản phẩm */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '40px', border: '1px solid #ddd', padding: '20px' }}>
        <h3>Thêm Sản Phẩm Mới</h3>
        <input type="text" placeholder="Tên sản phẩm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required style={{width: '100%', margin: '8px 0', padding: '8px'}} />
        <input type="text" placeholder="Thương hiệu" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} required style={{width: '100%', margin: '8px 0', padding: '8px'}} />
        <textarea placeholder="Mô tả ngắn" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required style={{width: '100%', margin: '8px 0', padding: '8px'}} />
        
        <input type="file" multiple onChange={e => setImages(Array.from(e.target.files))} style={{margin: '10px 0'}} />
        
        <button type="submit" style={{ padding: '12px 24px', background: '#28a745', color: 'white', border: 'none' }}>
          Tạo Sản Phẩm
        </button>
      </form>

      {/* Danh sách sản phẩm */}
      <h3>Danh sách Sản phẩm ({products.length})</h3>
<table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th>Tên sản phẩm</th>
      <th>Thương hiệu</th>
      <th>Giá</th>
      <th>Hành động</th>
    </tr>
  </thead>
  <tbody>
    {products.map(p => (
      <tr key={p._id}>
        <td>{p.name}</td>
        <td>{p.brand}</td>
        <td>{p.price.toLocaleString()}đ</td>
        <td>
          <button onClick={() => alert('Chức năng sửa sẽ làm sau')}>Sửa</button>
          <button 
            onClick={async () => {
              if (window.confirm('Xóa sản phẩm này?')) {
                await axios.delete(`http://localhost:5000/api/products/${p.slug}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                fetchProducts();
              }
            }}
            style={{ marginLeft: '8px', color: 'red' }}
          >
            Xóa
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default ProductManagement;