"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link"; // Link ইমপোর্ট করা হলো

export default function ProfileContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    const currentName = name.trim() !== "" ? name : session?.user?.name || "";
    
    if (!currentName.trim()) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await authClient.updateUser({
        name: currentName,
      });

      if (error) {
        toast.error("নাম আপডেট করতে সমস্যা হয়েছে!");
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("কিছু একটা সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে সাইন আউট করা হয়েছে!");  
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* হেডিং */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">আমার প্রোফাইল</h1>
        <p className="text-sm text-slate-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      {/* কার্ড ১: প্রোফাইল তথ্য ও সাইন আউট বাটন */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 mb-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-emerald-600 border border-emerald-500 shrink-0 relative flex items-center justify-center text-xl font-bold text-white shadow-2xs">
            {session?.user?.image ? (
              <Image 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                fill 
                className="object-cover" 
              />
            ) : (
              <span className="text-2xl uppercase">{session?.user?.name?.[0] || "👤"}</span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {session?.user?.name || "ব্যবহারকারী"}
            </h2>
            <p className="text-sm text-slate-500">
              {session?.user?.email || "example@gmail.com"}
            </p>
          </div>
        </div>

        {/* সাইন আউট বাটন */}
        <button
          onClick={handleSignOut}
          className="border border-rose-200 text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span>↩</span> সাইন আউট
        </button>
      </div>

      {/* কার্ড ২: তথ্য আপডেট সেকশন */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs mb-6">
        <h3 className="text-base font-bold text-slate-900 mb-4">তথ্য</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              নাম
            </label>
            <input 
              key={session?.user?.name || "loading"}
              type="text" 
              defaultValue={session?.user?.name || ""}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:bg-white focus:border-emerald-600 transition-colors"
            />
          </div>

          <button 
            type="button"
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-xs cursor-pointer disabled:opacity-50"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </div>
      </div>

      <div className="text-center">
        <Link 
          href="/" 
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1.5"
        >
          <span>←</span> হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}