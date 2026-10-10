import Banner from "@/components/Banner";
import UpProduct from "@/components/UpProduct";
import DownProduct from "@/components/DownProduct";
import AllProducts from "@/components/AllProducts";



export default function Home() {
  return (
    <div>
      <Banner />
      <UpProduct />
      <DownProduct />
      <AllProducts />
    </div>
  );
}
