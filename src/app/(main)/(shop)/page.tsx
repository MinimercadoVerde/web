import { Category } from "@/model/product";
import CanastaFamiliarIcon from "@/assets/icons/categories/canastaFamiliar"
import BebidasIcon from "@/assets/icons/categories/bebidas";
import MecatoIcon from "@/assets/icons/categories/mecato";
import MascotasIcon from "@/assets/icons/categories/mascotas";
import LicorIcon from "@/assets/icons/categories/licor";
import CategoryCard from "./components/CategoryCard";
import ProductsSlider from "./components/ProductsSlider";

const categories: Category[] = ["canastaFamiliar", "bebidas", "mecato", "licor", "aseo", "higienePersonal", "mascotas"]

export default function Home() {
  return (
    <div className="overflow-hidden">

      <div className="w-full flex flex-wrap gap-10 justify-center ">
   
          <CategoryCard category="canastaFamiliar" ><CanastaFamiliarIcon /></CategoryCard>
          <CategoryCard category="bebidas" ><BebidasIcon /></CategoryCard>
          <CategoryCard category="mecato"> <MecatoIcon /></CategoryCard>
          <CategoryCard category="licor"> <LicorIcon /></CategoryCard>
          <CategoryCard category="mascotas"> <MascotasIcon /></CategoryCard>
     
      </div>
      <ProductsSlider title="Productos destacados" category="canastaFamiliar" />
      <ProductsSlider title="Canasta Familiar" category="canastaFamiliar" />
      <ProductsSlider title="Canasta Familiar" category="mecato" />
      <ProductsSlider title="Aseo del hogar" category="aseo" />
      <ProductsSlider title="Higiene personal" category="higienePersonal" />
      <ProductsSlider title="Licores" category="licor" />
    </div>
  );
}