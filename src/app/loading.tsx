import { TbShoppingBag } from "react-icons/tb";
import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col items-center justify-center p-4 text-slate-800">
      <div className="card w-full max-w-sm bg-base-100 shadow-md border border-slate-200/80 rounded-3xl p-8 items-center text-center">
        
        {/* Animated Brand Icon */}
        <div className="relative flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-emerald-50 text-emerald-600">
          <TbShoppingBag className="text-4xl animate-bounce text-emerald-600" />
          <span className="absolute inset-0 rounded-2xl border-2 border-emerald-400/40 animate-ping opacity-75"></span>
        </div>

        {/* Bangla Message */}
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          অনুগ্রহ করে অপেক্ষা করুন...
        </h2>

        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          বাজারের সর্বশেষ সঠিক দাম ও তথ্য লোড হচ্ছে।
        </p>

        {/* DaisyUI Loading Badge */}
        <div className="badge badge-lg badge-ghost gap-2 py-4 px-4 text-xs font-medium text-slate-600 rounded-full">
          <ImSpinner2 className="animate-spin text-emerald-600 text-sm" />
          <span>ডাটা প্রসেস করা হচ্ছে</span>
        </div>

        {/* DaisyUI Progress Bar */}
        <progress className="progress progress-emerald w-full mt-6 h-1.5"></progress>
      </div>
    </div>
  );
}