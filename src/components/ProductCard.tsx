import Link from "next/link";

interface ProductCardProps {
  pro: {
    id: number;
    nameBn: string;
    categoryIcon?: string;
    unit: string;
    today: number;
    change: {
      dir: "up" | "down" | "flat";
      pct: number;
    };
  };
}

const ProductCard = ({ pro }: ProductCardProps) => {
  return (
    <Link href={`/product/${pro.id}`} className="block group">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs group-hover:shadow-md transition-all flex flex-col justify-between">
        {/* আইকন ও নাম */}
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
            {pro?.categoryIcon || "🛒"}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors">
              {pro.nameBn}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              প্রতি {pro.unit === "kg" ? "কেজি" : pro.unit || "কেজি"}
            </span>
          </div>
        </div>

        {/* দাম ও শতকরা হার */}
        <div className="flex items-end justify-between pt-3 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-500 block mb-0.5">আজকের দাম</span>
            <span className="text-xl font-extrabold text-slate-900">
              {pro.today} <span className="text-sm font-semibold text-slate-600">টাকা</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-rose-600 font-bold text-sm bg-rose-50 px-2.5 py-1 rounded-lg">
            <span>▲</span>
            <span>{pro?.change?.pct}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;