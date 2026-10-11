import MarqueeText from 'react-marquee-text';
import "react-marquee-text/dist/styles.css"
import Link from 'next/link';

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', {
    next: { revalidate: 60 }
  });
  const data: Product[] = await res.json();

  return (
    <div className="w-full bg-slate-50 border-y border-slate-200/80 py-2 overflow-hidden select-none">
      <MarqueeText direction='right' duration={10}>
        <div className="flex items-center gap-6 pr-6">
          {data.map((product) => {
            const isUp = product.change?.dir === "up";

            return (
              <div
                key={product.id || product.slug}
                className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200/60 shadow-2xs shrink-0 text-xs sm:text-sm"
              >
                {/* 1. Name with Link */}
                <Link 
                  href={`/product/${product.id}`}
                  className="font-bold text-slate-800 hover:text-emerald-600 transition-colors"
                >
                  {product.nameBn}
                </Link>

                {/* 2. Today Price */}
                <span className="text-slate-600">
                  ৳{product.today}
                </span>

                {/* 3. Direction (dir) and Percentage (pct) */}
                <span
                  className={`flex items-center gap-0.5 font-bold ${
                    isUp ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {isUp ? "▲" : "▼"} {product.change?.pct}%
                </span>
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;