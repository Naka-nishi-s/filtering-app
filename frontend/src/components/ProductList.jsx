import ProductCard from "./ProductCard.jsx";

function ProductList({ products, linkState, emptyMessage = "商品がありません" }) {
  if (products.length === 0) {
    return <p className="status">{emptyMessage}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} linkState={linkState} />
      ))}
    </div>
  );
}

export default ProductList;
