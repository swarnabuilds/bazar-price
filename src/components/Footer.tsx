const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-500 gap-3 text-center sm:text-left">
        <p className="font-medium">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="font-medium">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;