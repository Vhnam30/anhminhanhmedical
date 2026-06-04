import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.scss';

function AdminDashboard() {
  const handleLogout = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      window.location.href = '/admin/login';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🔧 Admin Anh Minh Anh Medical</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Đăng xuất
        </button>
      </div>

      <div className={styles.welcome}>
        <h2>Chào mừng bạn đến với trang quản trị!</h2>
        <p>Quản lý toàn bộ website từ đây.</p>
      </div>

      <div className={styles.dashboardGrid}>
        <Link to="/admin/products" className={styles.card}>
          <div className={styles.icon}>📦</div>
          <h3>Quản lý Sản phẩm</h3>
          <p>Thêm, sửa, xóa sản phẩm và upload ảnh</p>
        </Link>

        <Link to="/admin/product-details" className={styles.card}>
          <div className={styles.icon}>📋</div>
          <h3>Quản lý Chi tiết Sản phẩm</h3>
          <p>Cập nhật thông số kỹ thuật, mô tả dài, ưu điểm...</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;