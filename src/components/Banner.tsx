import Image from "next/image";
import Link from "next/link";
import banner from "@/asste/bazar-hero.png";


export default function Banner() {
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6">
      <div className="w-full bg-[#f6f9f5] border border-emerald-100/60 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        
        {/* Left Content */}
        <div className="flex-1 space-y-4 text-left">
          
          {/* Dynamic Date Badge */}
          <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs sm:text-sm font-semibold">
            {formattedDate}
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Call to Action Button */}
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

        </div>

        {/* Right Illustration */}
        <div className="w-48 sm:w-64 md:w-72 shrink-0 flex justify-center">
          <Image
            src= {banner}
            alt="Bazar Grocery Basket"
            width={280}
            height={280}
            priority
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}