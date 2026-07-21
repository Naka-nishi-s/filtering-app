import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchProduct, fetchProducts } from "../api/client.js";
import ProductList from "../components/ProductList.jsx";

const RECOMMENDED_COUNT = 3;

function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const backTo = location.state?.from || "/";
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProduct(null);
    setRecommended([]);
    fetchProduct(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!product) return;
    fetchProducts({ category_id: product.category_id })
      .then((products) => {
        setRecommended(products.filter((p) => p.id !== product.id).slice(0, RECOMMENDED_COUNT));
      })
      .catch(() => setRecommended([]));
  }, [product]);

  if (loading) {
    return (
      <main>
        <p className="status">読み込み中...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main>
        <p className="status">商品が見つかりませんでした</p>
        <Link className="back-link" to="/">
          ← 商品一覧へ戻る
        </Link>
      </main>
    );
  }

  const { name, description, price, category_name, image_url } = product;

  return (
    <main>
      <Link className="back-link" to={backTo}>
        ← 商品一覧へ戻る
      </Link>
      <div className="product-detail">
        <img className="product-detail-image" src={image_url} alt={name} />
        <div className="product-detail-body">
          {category_name && (
            <span className="product-card-category">{category_name}</span>
          )}
          <h1 className="product-detail-name">{name}</h1>
          <p className="product-detail-price">¥{price.toLocaleString()}</p>
          <p className="product-detail-description">{description}</p>
        </div>
      </div>

      <section className="recommended-section">
        <h2 className="recommended-section-title">おすすめ商品</h2>
        <ProductList products={recommended} emptyMessage="おすすめ商品はありません" />
      </section>
    </main>
  );
}

export default ProductDetailPage;
