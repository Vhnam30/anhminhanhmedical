// // ============================================================
// // Features.js – Đặc điểm nổi bật (6 cards)
// // - Hiển thị dưới dạng grid card
// // - Mỗi card có icon, tiêu đề, mô tả
// // - Hover animation với đường line bên trái
// // ============================================================
// import React from 'react';
// import styles from './Feature.module.scss';

// // Dữ liệu các tính năng nổi bật
// const FEATURES = [
//   {
//     icon: '🏆',
//     title: 'Chính hãng 100%',
//     desc: 'Thiết bị nhập khẩu trực tiếp từ nhà sản xuất, đầy đủ chứng nhận hợp quy và giấy phép lưu hành do Bộ Y Tế cấp phép.',
//   },
//   {
//     icon: '🛡️',
//     title: 'Bảo hành dài hạn',
//     desc: 'Bảo hành từ 24–36 tháng, bảo trì định kỳ miễn phí, cam kết thiết bị hoạt động ổn định và bền bỉ lâu dài.',
//   },
//   {
//     icon: '⚡',
//     title: 'Hỗ trợ 24/7',
//     desc: 'Đội ngũ kỹ thuật viên được đào tạo chuyên sâu, xử lý sự cố trong vòng 2 giờ tại TP.HCM, 4 giờ tại Hà Nội và các tỉnh.',
//   },
//   {
//     icon: '📦',
//     title: 'Giao hàng toàn quốc',
//     desc: 'Vận chuyển chuyên dụng, lắp đặt và hiệu chỉnh tại chỗ bởi kỹ sư được nhà sản xuất chứng nhận kỹ năng.',
//   },
//   {
//     icon: '💳',
//     title: 'Thanh toán linh hoạt',
//     desc: 'Hỗ trợ trả góp 0% lãi suất, đấu thầu bệnh viện công, hỗ trợ hồ sơ vay vốn đầu tư thiết bị y tế ngân hàng đối tác.',
//   },
//   {
//     icon: '🎓',
//     title: 'Đào tạo vận hành',
//     desc: 'Miễn phí đào tạo nhân sự sử dụng thiết bị, tài liệu tiếng Việt đầy đủ và hỗ trợ trực tuyến không giới hạn thời gian.',
//   },
// ];

// function Features() {
//   return (
//     <section className={styles.section} id="features">
//       <div className={styles.inner}>
//         {/* Header section */}
//         <div className={styles.header}>
//           <span className={styles.tag}>Tại sao chọn chúng tôi</span>
//           <h2 className={styles.title}>Đặc Điểm Nổi Bật</h2>
//           <div className={styles.divider} aria-hidden="true" />
//           <p className={styles.subtitle}>
//             Cam kết mang đến trải nghiệm mua sắm thiết bị y tế an toàn, chuyên nghiệp
//             và tiết kiệm nhất cho hệ thống y tế Việt Nam.
//           </p>
//         </div>

//         {/* Grid cards */}
//         <div className={styles.grid} role="list">
//           {FEATURES.map((feat) => (
//             <article
//               key={feat.title}
//               className={styles.card}
//               role="listitem"
//             >
//               <div className={styles.cardIcon} aria-hidden="true">{feat.icon}</div>
//               <h3 className={styles.cardTitle}>{feat.title}</h3>
//               <p className={styles.cardDesc}>{feat.desc}</p>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Features;

import React from 'react';
import styles from './Feature.module.scss';

const FEATURES = [
  {
    icon: '🏭',
    title: 'Đơn vị phân phối độc quyền',
    desc: 'Angelsounds (Tập đoàn JUMPER) tại Việt Nam'
  },
  {
    icon: '✅',
    title: 'Hàng chính hãng - Minh bạch nguồn gốc',
    desc: 'Phân phối trực tiếp từ nhà sản xuất, đầy đủ giấy tờ CO/CQ'
  },
  {
    icon: '🛡️',
    title: 'Bảo hành chính hãng',
    desc: 'Bảo hành dài hạn theo đúng chính sách của nhà sản xuất'
  },
  {
    icon: '📍',
    title: 'Hỗ trợ kỹ thuật 24/7',
    desc: 'Tại TP.HCM'
  },
  // {
  //   icon: '🤝',
  //   title: 'Hỗ trợ tư vấn & đấu thầu',
  //   desc: 'Hỗ trợ các phòng khám và bệnh viện toàn quốc'
  // }
];

function Feature() {
  return (
    <section className={styles.section} id="feature">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Lý do chọn Thiết Bị Y Tế Anh Minh Anh</h2>
          <p className={styles.subtitle}>
            Đối tác tin cậy của các phòng khám và cơ sở y tế trên toàn quốc
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Phần giới thiệu phân phối độc quyền */}
        {/* <div className={styles.distributorSection}>
          <h3 className={styles.distributorTitle}>
            Đơn vị phân phối độc quyền chính hãng Angelsounds (Tập đoàn JUMPER) tại Việt Nam
          </h3>
          <p className={styles.distributorText}>
            Tự hào là nhà phân phối độc quyền dòng máy CTG thương hiệu Angelsounds từ tập đoàn thiết bị y tế danh tiếng JUMPER tại thị trường Việt Nam, 
            <strong> Thiết Bị Y Tế Anh Minh Anh</strong> cam kết mang đến cho các phòng khám và cơ sở y tế giải pháp công nghệ chính hãng với chất lượng chuẩn quốc tế.
          </p>
          <p className={styles.distributorText}>
            Việc phân phối trực tiếp và độc quyền không chỉ đảm bảo tính minh bạch tuyệt đối về nguồn gốc thiết bị mà còn giúp khách hàng tiếp cận được chính sách giá cạnh tranh tối ưu nhất. 
            Hơn thế nữa, các cơ sở y tế sẽ hoàn toàn yên tâm với dịch vụ hậu mãi, bảo hành chính hãng từ nhà sản xuất và sự hỗ trợ kỹ thuật chuyên nghiệp, toàn diện, luôn sẵn sàng đồng hành cùng đội ngũ y bác sĩ trong sứ mệnh nâng cao chất lượng chăm sóc sức khỏe mẹ và bé.
          </p>
        </div> */}
      </div>
    </section>
  );
}

export default Feature;