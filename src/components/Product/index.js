import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Product.module.scss";

// Import ảnh tĩnh (dùng làm fallback)

function Product({ fullMode = false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState({});

  // Dữ liệu tĩnh fallback (sản phẩm cũ)
  const staticProducts = [
    {
     
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        if (data.success && data.products.length > 0) {
          setProducts(data.products);
        } else {
          setProducts(staticProducts);
        }
      } catch (err) {
        console.error("Lỗi tải sản phẩm từ backend:", err);
        setProducts(staticProducts); // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePrev = (slug) => {
    setCurrentIndex((prev) => ({
      ...prev,
      [slug]: ((prev[slug] || 0) - 1 + 3) % 3,
    }));
  };

  const handleNext = (slug) => {
    setCurrentIndex((prev) => ({
      ...prev,
      [slug]: ((prev[slug] || 0) + 1) % 3,
    }));
  };

  const displayedProducts = fullMode ? products : products.slice(0, 6);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px" }}>
        Đang tải sản phẩm...
      </div>
    );
  }

  return (
    <section className={styles.section} id="product">
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {fullMode ? "Tất Cả Sản Phẩm" : "Sản Phẩm Nổi Bật"}
          </h2>
          {!fullMode && (
            <Link to="/san-pham" className={styles.viewAll}>
              Xem tất cả →
            </Link>
          )}
        </div>

        <div className={styles.productGrid}>
          {displayedProducts.map((product) => {
            const index =
              currentIndex[product.slug] || currentIndex[product.id] || 0;
            const currentImage =
              product.images?.[index] || product.images?.[0] || "";

            return (
              <div
                key={product.slug || product.id}
                className={styles.productCard}
              >
                <div className={styles.imageWrapper}>
                  <div className={styles.imageBox}>
                    {currentImage ? (
                      <img
                        src={currentImage}
                        alt={product.name}
                        className={styles.productImage}
                      />
                    ) : (
                      <div className={styles.placeholder}>
                        <span className={styles.placeholderIcon}>🖼️</span>
                        <p>Đang cập nhật</p>
                      </div>
                    )}
                  </div>

                  {product.images?.length > 1 && (
                    <>
                      <button
                        className={styles.sliderBtn}
                        onClick={() => handlePrev(product.slug || product.id)}
                      >
                        ‹
                      </button>
                      <button
                        className={styles.sliderBtn}
                        onClick={() => handleNext(product.slug || product.id)}
                      >
                        ›
                      </button>
                    </>
                  )}

                  {product.badge && (
                    <div className={styles.badge}>{product.badge}</div>
                  )}
                </div>

                <div className={styles.info}>
                  <div className={styles.brand}>{product.brand}</div>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.description}>{product.description}</p>

                  <div className={styles.btnGroup}>
                    <Link
                      to={`/san-pham/${product.slug || product.id}`}
                      className={styles.btnDetail}
                    >
                      Chi tiết
                    </Link>
                    <Link to="/lien-he" className={styles.btnContact}>
                      Liên hệ
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Product;
