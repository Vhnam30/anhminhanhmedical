import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.scss";

// Dữ liệu liên hệ
const CONTACT_INFO = [
  {
    icon: "📞",
    label: "Hotline",
    value: "0369 270 210 – 0379 880 210",
    href: "tel:0369 270 210",
  },
  {
    icon: "📧",
    label: "Email",
    value: "tbytamanh2025@gmail.com",
    href: "mailto:tbytamanh2025@gmail.com",
  },
];

// Danh sách dịch vụ quan tâm
const SERVICES = [
  "Thiết bị phòng khám sản phụ khoa (CTG không dây, CTG điện toán)",
  "Máy siêu âm giá ưu đãi",
  "Hỗ trợ thủ tục hành chính thành lập phòng khám",
  "Tư vấn thuế hộ kinh doanh & doanh nghiệp",
  "Dịch vụ Marketing phòng khám",
  "Phần mềm quản lý vận hành phòng khám",
  "Tư vấn thiết kế và thi công phòng khám",
  "Sửa chữa thiết bị y tế & hỗ trợ máy dự phòng",
];

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  services: [],        // ← Đổi thành mảng để chọn nhiều
  message: "",
};

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleChange = (e) => {
   const { name, value, checked } = e.target;     // ← Xóa 'type'
  
  if (name === "services") {
    setForm((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter((item) => item !== value),
    }));
  } else {
    setForm((prev) => ({ ...prev, [name]: value }));
  }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (sendError) setSendError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!form.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^[0-9]{9,11}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ (9-11 số)";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSendError("");

    const templateParams = {
  from_name: form.name,
  phone: form.phone,
  email: form.email || "Không cung cấp",
  
  // Phần dịch vụ (đã format lại cho dễ đọc)
  services: form.services.length > 0 
    ? form.services.join("\n- ") 
    : "Không chọn dịch vụ cụ thể",
  
  message: form.message || "Không có nội dung chi tiết",
  send_time: new Date().toLocaleString('vi-VN'),
};

    emailjs
      .send(
        "service_bipnpcj",
        "template_195gnwu",
        templateParams,
        "nkBGhwWozcQd9kbub"
      )
      .then(() => {
        setSubmitted(true);
        setForm(INITIAL_FORM);
        setTimeout(() => setSubmitted(false), 6000);
      })
      .catch((error) => {
        console.error("EmailJS Error Details:", error);
        setSendError("Gửi thất bại. Vui lòng thử lại sau.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <span className={styles.tag}>Liên hệ với chúng tôi</span>
        <h2 className={styles.title}>Nhận Tư Vấn Miễn Phí</h2>
        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.grid}>
          {/* Cột trái: Thông tin */}
          <div className={styles.infoCol}>
            <h3 className={styles.infoHeading}>Thông tin liên hệ</h3>

            {CONTACT_INFO.map((item) => (
              <div key={item.label} className={styles.infoItem}>
                <div className={styles.infoIcon}>{item.icon}</div>
                <div className={styles.infoText}>
                  <strong className={styles.infoLabel}>{item.label}</strong>
                  <a href={item.href} className={styles.infoValue}>
                    {item.value}
                  </a>
                </div>
              </div>
            ))}

            <div className={styles.emergency}>
              <p className={styles.emergencyTitle}>🎯 Hỗ trợ kỹ thuật khẩn cấp 24/7</p>
            </div>
          </div>

          {/* Cột phải: Form */}
          <div className={styles.formBox}>
            <h3 className={styles.formHeading}>Gửi yêu cầu tư vấn</h3>

            {submitted && (
              <div className={styles.successMsg}>
                ✅ Cảm ơn bạn! Chuyên viên sẽ liên hệ trong vòng 30 phút.
              </div>
            )}

            {sendError && <div className={styles.errorMsg}>{sendError}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Họ và tên <span>*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Số điện thoại <span>*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="0369 270 210"
                    className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                  />
                  {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className={styles.input}
                />
              </div>

              {/* === DỊCH VỤ QUAN TÂM (Checkbox) === */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Dịch vụ quan tâm <span>*</span></label>
                <div className={styles.checkboxGroup}>
                  {SERVICES.map((service, index) => (
                    <label key={index} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="services"
                        value={service}
                        checked={form.services.includes(service)}
                        onChange={handleChange}
                      />
                      <span>{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Nội dung tư vấn thêm</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Mô tả thêm nhu cầu của bạn..."
                  className={styles.textarea}
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? "⏳ Đang gửi yêu cầu..." : "Gửi yêu cầu tư vấn →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;