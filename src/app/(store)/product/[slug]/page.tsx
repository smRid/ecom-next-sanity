import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableTextComponents } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import AddToBasketButton from "@/components/AddToBasketButton";

// Custom components for PortableText rendering
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-gray-800 mb-3 mt-5">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-gray-800 mb-2 mt-4">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4 bg-gray-50 py-2">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }) => (
      <a href={value?.href} className="text-blue-600 hover:text-blue-800 underline">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-gray-600 space-y-1">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-1">{children}</li>
    ),
  },
};

async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound()
  }

  const isOutOfStock = product.Stock != null && product.Stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
            className={`relative aspect-square overflow-hidden rounded-lg ,
            shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
            {product.image && (
            <>
                <Image
                src={imageUrl(product.image).url()}
                alt={product.name ?? "Product image"}
                fill
                className="object-contain transition-transform duration-300
                hover:scale-105"
                />
            </>
            )}

            {isOutOfStock && (
            <div
                className="absolute inset-0 flex items-center justify-center
                bg-black bg-opacity-50"
            >
                <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
            )}
        </div>

                <div className="flex flex-col justify-between">
        <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
            ${product.price?.toFixed(2)}
            </div>
            <div className="prose prose-lg max-w-none mb-6">
            {Array.isArray(product.description) && (
                <PortableText value={product.description} components={portableTextComponents} />
            )}
            </div>
        </div>

        <div className="mt-6">
          <AddToBasketButton
            product={product}
            disabled={isOutOfStock}
          />
        </div>
        </div>
        </div>
    </div>
);
}

export default ProductPage;