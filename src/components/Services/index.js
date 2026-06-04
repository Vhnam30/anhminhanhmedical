import React from 'react';
import styles from './Services.module.scss';

const servicesData = [
    {
        title: "Thiết bị Phòng khám Sản Phụ Khoa",
        desc: "Cung cấp đầy đủ thiết bị phòng khám sản phụ khoa, đặc biệt là dòng máy CTG không dây và CTG điện toán hiện đại.",
        icon: "🩺"
    },
    {
        title: "Máy Siêu Âm Giá Ưu Đãi",
        desc: "Cung cấp các dòng máy siêu âm chính hãng với giá cạnh tranh và chính sách bảo hành tốt nhất.",
        icon: "📷"
    },
    {
        title: "Hỗ trợ Thủ tục Hành chính",
        desc: "Hỗ trợ hoàn thiện thủ tục thành lập phòng khám nhanh chóng, đúng quy định pháp luật.",
        icon: "📋"
    },
    {
        title: "Tư vấn Thuế & Kế toán",
        desc: "Tư vấn thuế hộ kinh doanh và doanh nghiệp, hỗ trợ kê khai thuế định kỳ.",
        icon: "💼"
    },
    {
        title: "Marketing Phòng Khám",
        desc: "Cung cấp dịch vụ marketing chuyên sâu giúp phòng khám thu hút bệnh nhân hiệu quả.",
        icon: "📢"
    },
    {
        title: "Phần mềm Quản lý Phòng Khám",
        desc: "Cung cấp phần mềm vận hành phòng khám hiện đại, quản lý hồ sơ bệnh án, lịch hẹn, kho thuốc.",
        icon: "💻"
    },
    {
        title: "Thiết kế & Thi công",
        desc: "Tư vấn thiết kế và thi công phòng khám theo tiêu chuẩn y khoa, tối ưu công năng.",
        icon: "🏥"
    },
    {
        title: "Sửa chữa Thiết bị Y tế",
        desc: "Sửa chữa các thiết bị y tế (CTG, máy nước tiểu, siêu âm...), hỗ trợ máy dự phòng trong thời gian sửa chữa.",
        icon: "🔧"
    }
];

function Services() {
    return (
        <section className={styles.services} id="services">
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.tag}>Dịch vụ của chúng tôi</span>
                    <h2 className={styles.title}>Giải pháp Toàn diện cho Phòng Khám</h2>
                    <p className={styles.subtitle}>
                        Chúng tôi không chỉ cung cấp thiết bị mà còn đồng hành cùng bạn trong suốt quá trình xây dựng và vận hành phòng khám.
                    </p>
                </div>

                <div className={styles.grid}>
                    {servicesData.map((service, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>{service.icon}</div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;