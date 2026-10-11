"use client";

import ProductCard from "@/components/ProductCard";
import { useState, useEffect, use } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default function CategoryProductsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`);
        const data = await res.json();
        const proList = Array.isArray(data) ? data : data.products || [];
        setProducts(proList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [slug]);

  // Sorting Logic (দাম অনুযায়ী সাজানো)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-high") {
      return a.today - b.today; // কম থেকে বেশি
    } else if (sortOrder === "high-low") {
      return b.today - a.today; // বেশি থেকে কম
    }
    return 0; // ডিফল্ট
  });

  const firstProduct = products.find((item) => item.categoryNameBn);
  const categoryTitle = firstProduct?.categoryNameBn || slug;
  const categoryIcon = firstProduct?.categoryIcon || "🍚";

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500 font-medium">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* Top Banner Card */}
      <div className="bg-white border border-slate-200/85 rounded-2xl p-6 mb-6 shadow-2xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-3xl shrink-0">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">{categoryTitle}</h1>
          <p className="text-sm text-slate-500 font-medium">
            {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sorting & Filter Bar */}
      <div className="bg-white border border-slate-200/85 rounded-2xl p-4 mb-6 shadow-2xs flex items-center justify-between">
        <div></div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium">সাজান</span>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 outline-none font-medium cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-high">দাম: কম থেকে বেশি</option>
            <option value="high-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Total count message */}
      <div className="mb-4">
        <p className="text-sm text-slate-600 font-medium">
          মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((pro) => (
            <ProductCard key={pro.id || pro.slug} pro={pro} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl">
          <p className="text-slate-500 font-medium">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      )}
    </main>
  );
}