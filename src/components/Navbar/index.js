import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { logo } from '../../assets/img';

const NAV_ITEMS = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Sản phẩm', to: '/san-pham' },
  { label: 'Dịch vụ', to: '/dich-vu' },
  { label: 'Liên hệ', to: '/lien-he' },
  { label: 'Về chúng tôi', to: '#about' },
];

const HOTLINES = [
  '0369 270 210',
  '0379 880 210',
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Xử lý click cho các mục anchor (#services, #about)
  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    const sectionId = href.replace('#', '');

    // Nếu đang ở trang chủ thì chỉ scroll
    if (location.pathname === '/') {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } 
    // Nếu đang ở trang khác thì chuyển về trang chủ rồi scroll
    else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  // Kiểm tra link active
  const isActive = (item) => {
    if (item.to.startsWith('#')) return false;
    return location.pathname === item.to;
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`} data-navbar>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Anh Minh Anh" className={styles.logoImage} />
          <div className={styles.logoText}>
            <span className={styles.logoName}>Anh Minh Anh</span>
            <span className={styles.logoTagline}>Thiết Bị Y Tế</span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <ul className={styles.menu}>
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              {item.to.startsWith('#') ? (
                <a
                  href={item.to}
                  onClick={(e) => handleAnchorClick(e, item.to)}
                  className={styles.navLink}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.to}
                  className={`${styles.navLink} ${isActive(item) ? styles.active : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Hotline Desktop */}
        <div className={styles.hotlineGroup}>
          {HOTLINES.map((number, index) => (
            <a
              key={index}
              href={`tel:${number.replace(/\s/g, '')}`}
              className={styles.hotline}
            >
              <span className={styles.hotlineIcon}>📞</span>
              {number}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <React.Fragment key={item.to}>
              {item.to.startsWith('#') ? (
                <a
                  href={item.to}
                  onClick={(e) => handleAnchorClick(e, item.to)}
                  className={styles.mobileLink}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.to}
                  className={`${styles.mobileLink} ${isActive(item) ? styles.active : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}

          <div className={styles.mobileHotlineTitle}>Hotline liên hệ</div>
          {HOTLINES.map((number, index) => (
            <a
              key={index}
              href={`tel:${number.replace(/\s/g, '')}`}
              className={styles.mobileHotline}
            >
              📞 {number}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;