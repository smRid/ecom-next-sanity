import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {
  // Execute Query - Using a more explicit approach
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[
      _type == "product"
      && $categorySlug in category[]->slug.current
    ] | order(name asc)
  `);

    try {
        // Use sanityFetch to send the query and pass the category slug
        const products = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: {
            categorySlug,
            },
        });

        // Return the list of products, or an empty array if none are found
        return products.data || [];
        } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }
};