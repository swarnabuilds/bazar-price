import Link from "next/link";

interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetail {
  id: number;
  nameBn: string;
  categoryName: string;
  categoryIcon?: string;
  unit: string;
  today: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: MarketPrice[];
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // নির্দিষ্ট প্রোডাক্টের ডাটা ফেচ করা
  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`, {
    cache: "no-store",
  });
  const product: ProductDetail = await res.json();

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      {/*   (Breadcrumb) */}
      <div className="text-sm text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-800">হোম</Link>
        <span>›</span>
        <span>{product?.categoryName || "পণ্য"}</span>
        <span>›</span>
        <span className="text-slate-900 font-medium">{product?.nameBn}</span>
      </div>

      {/*  product header*/}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">
            {product?.categoryIcon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">{product?.nameBn}</h1>
            <p className="text-sm text-slate-500">প্রতি {product?.unit === "kg" ? "কেজি" : product?.unit || "কেজি"}</p>
            <p className="text-xs text-rose-600 mt-1 font-medium">গতকালকের তুলনায় আজ দাম বেড়েছে ২ টাকা</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-100 px-6 py-4 rounded-xl text-right w-full sm:w-auto">
          <span className="text-xs text-slate-500 block">আজকের দাম</span>
          <span className="text-2xl font-black text-slate-900">{product?.today} <span className="text-sm font-semibold">টাকা / কেজি</span></span>
          <div className="text-rose-600 font-bold text-xs mt-1 flex items-center justify-end gap-1">
            <span>▲</span> <span>{product?.change?.pct}%</span>
          </div>
        </div>
      </div>

      {/*  (Summary Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500">সর্বনিম্ন দাম</span>
          <p className="text-xl font-bold text-slate-900 my-1">{product?.minPrice || 59} <span className="text-sm font-normal">টাকা</span></p>
          <span className="text-xs text-slate-400">বাজারভিক্তিক সর্বনিম্ন বাজার</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500">সর্বাধিক দাম</span>
          <p className="text-xl font-bold text-slate-900 my-1">{product?.maxPrice || 73} <span className="text-sm font-normal">টাকা</span></p>
          <span className="text-xs text-slate-400">বাজারভিক্তিক সর্বোচ্চ বাজার</span>
        </div>
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-slate-500">গড় খরচ</span>
          <p className="text-xl font-bold text-slate-900 my-1">{product?.avgPrice || 66} <span className="text-sm font-normal">টাকা</span></p>
          <span className="text-xs text-slate-400">প্রতি কেজি-এর হিসাব</span>
        </div>
      </div>

      {/*  (Modern Table ) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="text-lg font-bold text-slate-900">বাজারভিত্তিক আজকের দাম</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-slate-200 text-xs text-slate-500 uppercase bg-slate-50/75">
                <th className="py-3.5 px-6 font-semibold">বাজার</th>
                <th className="py-3.5 px-6 font-semibold">বিভাগ</th>
                <th className="py-3.5 px-6 font-semibold">সর্বনিম্ন</th>
                <th className="py-3.5 px-6 font-semibold">সর্বাধিক</th>
                <th className="py-3.5 px-6 font-semibold">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {product?.markets?.length > 0 ? (
                product.markets.map((m, idx) => {
                  const avgPrice = ((m.min + m.max) / 2).toFixed(2).replace(/\.00$/, '');
                  // Alternating row background (even rows: white, odd rows: light gray)
                  const rowBg = idx % 2 === 0 ? "bg-white" : "bg-slate-50/50";
                  return (
                    <tr key={idx} className={`${rowBg} hover:bg-slate-100/60 transition-colors`}>
                      <td className="py-3.5 px-6 font-medium text-slate-900">{m.market}</td>
                      <td className="py-3.5 px-6 text-slate-600">{m.division}</td>
                      <td className="py-3.5 px-6">{m.min} টাকা</td>
                      <td className="py-3.5 px-6">{m.max} টাকা</td>
                      <td className="py-3.5 px-6 font-semibold">{avgPrice} টাকা</td>
                    </tr>
                  );
                })
              ) : (
                <>
                  <tr className="bg-white"><td className="py-3.5 px-6">টাইট বাজার</td><td className="py-3.5 px-6 text-slate-600">ঢাকা</td><td className="py-3.5 px-6">৫৯ টাকা</td><td className="py-3.5 px-6">৬২ টাকা</td><td className="py-3.5 px-6 font-semibold">৬২ টাকা</td></tr>
                  <tr className="bg-slate-50/50"><td className="py-3.5 px-6">সবুজ বাজার</td><td className="py-3.5 px-6 text-slate-600">রাজশাহী</td><td className="py-3.5 px-6">৬০ টাকা</td><td className="py-3.5 px-6">৬৬ টাকা</td><td className="py-3.5 px-6 font-semibold">৬৩ টাকা</td></tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}