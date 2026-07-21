import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList.jsx";
import Pagination from "../components/Pagination.jsx";
import { fetchProducts } from "../api/client.js";

const PAGE_SIZE = 12;

function ProductListPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const requestedPage = Number(searchParams.get("page")) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);

  const pageProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, currentPage]);

  function goToPage(page) {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    setSearchParams(params);
    window.scrollTo({ top: 0 });
  }

  return (
    <>
      <header className="app-header">
        <h1>商品一覧</h1>
      </header>
      <main>
        {loading && <p className="status">読み込み中...</p>}
        {error && <p className="status">エラー: {error}</p>}
        {!loading && !error && (
          <>
            <ProductList
              products={pageProducts}
              linkState={{ from: `${location.pathname}${location.search}` }}
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
          </>
        )}
      </main>
    </>
  );
}

export default ProductListPage;
