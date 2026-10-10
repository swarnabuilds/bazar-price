import Link from "next/link";
import { FiHelpCircle, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col items-center justify-center p-4 text-slate-800">
      <div className="card w-full max-w-md bg-base-100 shadow-md border border-slate-200/80 rounded-3xl p-8 sm:p-10 items-center text-center">
        
        {/* Badge Icon */}
        <div className="relative flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-emerald-50 text-emerald-600">
          <FiHelpCircle className="text-5xl text-emerald-600 animate-pulse" />
          <span className="absolute inset-0 rounded-3xl border-2 border-emerald-400/30 animate-ping"></span>
        </div>

        {/* DaisyUI Badge for Error Status */}
        <span className="badge badge-emerald badge-outline font-bold uppercase tracking-widest text-xs py-2 px-3 mb-3">
          Error 404
        </span>

        {/* Bangla Text */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          পেজটি পাওয়া যায়নি!
        </h1>

        <p className="text-sm text-slate-600 mb-8 leading-relaxed">
          আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা ইউআরএল (URL) ভুল লিখা হয়েছে।
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl font-semibold text-sm normal-case w-full flex items-center justify-center gap-2 shadow-sm"
        >
          <FiHome className="text-lg" />
          হোম পেজে ফিরে যান
        </Link>
      </div>

      {/* Footer Branding */}
      <p className="mt-8 text-xs text-slate-400 text-center">
        বাজার দর — সঠিক ও দ্রুত তথ্যের আস্থাশীল প্ল্যাটফর্ম
      </p>
    </div>
  );
}