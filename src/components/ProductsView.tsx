import { Category, Product } from "../../sanity.types";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
  products: Product[];
  categories: Category
}

const ProductsView = ({ products }: ProductsViewProps) => {
  return (
    <div className="flex flex-col">
      {/* categories */}
      <div className="w-full sm:w-[200px]">
        {/* <CategorySelectorComponent category={category}/> */}
      </div>

      {/* products */}
      <div className="flex-1">
        <div>
            <ProductGrid products={products} />

            <hr  className="w-1/2 sm:w-3/4"/>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ProductsView;