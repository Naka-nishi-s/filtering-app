import ProductCard from "./ProductCard.jsx";

function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="status">商品がありません</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
