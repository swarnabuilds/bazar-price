"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const UpProduct = () => {
  const [upProducts, setUpProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://openapi.programming-hero.com/api/bazardor/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        if (Array.isArray(data)) {
          const filteredProducts = data.filter(product => product.change?.dir === "up");        
          setUpProducts(filteredProducts.slice(0, 6));
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className=" max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/* হেডিং অংশ */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-rose-600 text-lg">▲</span>
        <h2 className="text-xl font-bold text-slate-900">আজ দাম বেড়েছে</h2>
      </div>

      {/* product grid*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {upProducts.map((pro) => (
          <ProductCard key={pro.id || pro.slug} pro={pro} />
        ))}
      </div>
    </section>
  );
};

export default UpProduct;