"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Category {
  id?: string | number;
  nameBn: string;
  slug?: string;
  icon?: string;
}

export default function MenuCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('https://openapi.programming-hero.com/api/bazardor/categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-2 py-2 bg-white border-b border-slate-100">
      {categories.map((category, index) => (
        <Link 
          key={category.id || category.slug || index}
          href={`/category/${category.slug || category.nameBn}`}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700 text-sm font-medium transition-all shadow-2xs"
        >
          <span>{category.icon}</span>
          {category.nameBn}
        </Link>
      ))}
    </div>
  );
}