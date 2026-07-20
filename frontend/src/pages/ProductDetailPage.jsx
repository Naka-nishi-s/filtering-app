import { Link, useParams } from "react-router-dom";
import { getProductById } from "../data/products.js";

function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
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
      <Link className="back-link" to="/">
        ← 商品一覧へ戻る
      </Link>
      <div className="product-detail">
        <img className="product-detail-image" src={image_url} alt={name} />
        <div className="product-detail-body">
          {category_name && <span className="product-card-category">{category_name}</span>}
          <h1 className="product-detail-name">{name}</h1>
          <p className="product-detail-price">¥{price.toLocaleString()}</p>
          <p className="product-detail-description">{description}</p>
        </div>
      </div>

      <section className="recommended-section">
        <h2 className="recommended-section-title">おすすめ商品</h2>
      </section>
    </main>
  );
}

export default ProductDetailPage;
