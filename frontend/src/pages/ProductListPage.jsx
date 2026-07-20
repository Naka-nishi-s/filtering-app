import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList.jsx";
import Pagination from "../components/Pagination.jsx";
import { productsWithCategory } from "../data/products.js";

const PAGE_SIZE = 12;

function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(productsWithCategory.length / PAGE_SIZE));
  const requestedPage = Number(searchParams.get("page")) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);

  const pageProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return productsWithCategory.slice(start, start + PAGE_SIZE);
  }, [currentPage]);

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
        <ProductList products={pageProducts} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </main>
    </>
  );
}

export default ProductListPage;
