import ProductCard from "./ProductCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon?: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const AllProducts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
    const data: Product[] = await res.json();
    const productList = Array.isArray(data) ? data : [];

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">সব পণ্য</h2>
                <p className="text-sm text-slate-500 font-medium">
                    মোট {productList.length}টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {productList.map((pro, idx) => (
                    <ProductCard key={pro.id || idx} pro={pro} />
                ))}
            </div>
        </section>
    );
};

export default AllProducts;