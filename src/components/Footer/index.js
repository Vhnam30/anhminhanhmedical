import React from "react";
import styles from "./Footer.module.scss";
import { logo } from "../../assets/img";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Cột 1: Logo & Mạng xã hội */}
          <div className={styles.col}>
            <div className={styles.logoGroup}>
              <img src={logo} alt="Anh Minh Anh" className={styles.logo} />
              <div>
                <h3 className={styles.companyName}>Anh Minh Anh</h3>
                <p className={styles.tagline}>Thiết Bị Y Tế</p>
              </div>
            </div>
            <p className={styles.description}>
              Đơn vị phân phối độc quyền chính hãng Angelsounds - JUMPER tại
              Việt Nam
            </p>

            {/* Mạng xã hội */}
            <div className={styles.socialGroup}>
              <h4 className={styles.socialTitle}>Kết nối với chúng tôi</h4>
              <div className={styles.socialIcons}>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/p/Thi%E1%BA%BFt-B%E1%BB%8B-Y-T%E1%BA%BF-Anh-Minh-Anh-61566734227594/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"/></svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@minh.anh8445"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="TikTok"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.104,4,24,4z M22.689,13.474 c-0.13,0.012-0.261,0.02-0.393,0.02c-1.495,0-2.809-0.768-3.574-1.931c0,3.049,0,6.519,0,6.577c0,2.685-2.177,4.861-4.861,4.861 C11.177,23,9,20.823,9,18.139c0-2.685,2.177-4.861,4.861-4.861c0.102,0,0.201,0.009,0.3,0.015v2.396c-0.1-0.012-0.197-0.03-0.3-0.03 c-1.37,0-2.481,1.111-2.481,2.481s1.11,2.481,2.481,2.481c1.371,0,2.581-1.08,2.581-2.45c0-0.055,0.024-11.17,0.024-11.17h2.289 c0.215,2.047,1.868,3.663,3.934,3.811V13.474z"/></svg>
                </a>

                {/* Shopee */}
                <a
                  href="https://shopee.vn/amanh25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label="Shopee"
                >
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#f4511e" d="M36.683,43H11.317c-2.136,0-3.896-1.679-3.996-3.813l-1.272-27.14C6.022,11.477,6.477,11,7.048,11 h33.904c0.571,0,1.026,0.477,0.999,1.047l-1.272,27.14C40.579,41.321,38.819,43,36.683,43z"/><path fill="#f4511e" d="M32.5,11.5h-2C30.5,7.364,27.584,4,24,4s-6.5,3.364-6.5,7.5h-2C15.5,6.262,19.313,2,24,2 S32.5,6.262,32.5,11.5z"/><path fill="#fafafa" d="M24.248,25.688c-2.741-1.002-4.405-1.743-4.405-3.577c0-1.851,1.776-3.195,4.224-3.195 c1.685,0,3.159,0.66,3.888,1.052c0.124,0.067,0.474,0.277,0.672,0.41l0.13,0.087l0.958-1.558l-0.157-0.103 c-0.772-0.521-2.854-1.733-5.49-1.733c-3.459,0-6.067,2.166-6.067,5.039c0,3.257,2.983,4.347,5.615,5.309 c3.07,1.122,4.934,1.975,4.934,4.349c0,1.828-2.067,3.314-4.609,3.314c-2.864,0-5.326-2.105-5.349-2.125l-0.128-0.118l-1.046,1.542 l0.106,0.087c0.712,0.577,3.276,2.458,6.416,2.458c3.619,0,6.454-2.266,6.454-5.158C30.393,27.933,27.128,26.741,24.248,25.688z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Các cột còn lại giữ nguyên */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Sản phẩm</h4>
            <ul className={styles.linkList}>
              
              <li>
                <a href="#product">Máy siêu âm thai</a>
              </li>
              <li>
                <a href="#product">Phụ kiện thiết bị y tế</a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Về chúng tôi</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#about">Giới thiệu công ty</a>
              </li>
              <li>
                <a href="#feature">Lý do chọn chúng tôi</a>
              </li>
              <li>
                <a href="#about">Chứng nhận & Giấy phép</a>
              </li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Liên hệ ngay</h4>
            <div className={styles.contactInfo}>
              <p>
                <strong>Hotline:</strong>
              </p>
              <p>
                <a href="tel:0369270210" className={styles.hotline}>
                  0369 270 210
                </a>
              </p>
              <p>
                <a href="tel:0379880210" className={styles.hotline}>
                  0379 880 210
                </a>
              </p>

              <p style={{ marginTop: "20px" }}>
                <strong>Email:</strong>
                <br />
                <a href="mailto:tbytamanh2025@gmail.com" className={styles.emailContact}>
                  tbytamanh2025@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.inner}>
          <p className={styles.copyright}>
            © {currentYear} Thiết Bị Y Tế Anh Minh Anh. All Rights Reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;
