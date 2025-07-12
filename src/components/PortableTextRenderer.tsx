import { PortableText } from '@portabletext/react';
import { PortableTextBlock } from '@portabletext/types';

interface PortableTextRendererProps {
  value: PortableTextBlock[];
  className?: string;
}

// Custom components for different block types
const components = {
  block: {
    // Headers
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-semibold text-gray-800 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{children}</h4>
    ),
    // Normal paragraph
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-gray-600 mb-4">{children}</p>
    ),
    // Blockquote
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Bold text
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    // Italic text
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    // Links
    link: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => (
      <a href={value.href} className="text-blue-600 hover:text-blue-800 underline">
        {children}
      </a>
    ),
  },
  list: {
    // Bullet lists
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 text-gray-600">{children}</ul>
    ),
  },
  listItem: {
    // List items
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="mb-1">{children}</li>
    ),
  },
};

export default function PortableTextRenderer({ value, className = '' }: PortableTextRendererProps) {
  if (!value || value.length === 0) {
    return <p className="text-gray-500">No content available</p>;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
