import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { id, name, description, price, category_name, image_url } = product;

  return (
    <Link className="product-card" to={`/products/${id}`}>
      <img className="product-card-image" src={image_url} alt={name} />
      <div className="product-card-body">
        {category_name && <span className="product-card-category">{category_name}</span>}
        <h2 className="product-card-name">{name}</h2>
        <p className="product-card-description">{description}</p>
        <p className="product-card-price">¥{price.toLocaleString()}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
