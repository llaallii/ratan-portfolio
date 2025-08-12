import Image from "next/image";
import { ReactNode } from "react";

export function Callout({
  children,
  type = "info",
}: {
  children: ReactNode;
  type?: "info" | "warn";
}) {
  const colors: Record<string, string> = {
    info: "border-blue-500 bg-blue-50",
    warn: "border-yellow-500 bg-yellow-50",
  };
  return (
    <div className={`my-4 border-l-4 p-4 ${colors[type]}`}>{children}</div>
  );
}

export function CodeBlock(
  props: React.HTMLAttributes<HTMLPreElement>
): JSX.Element {
  return (
    <pre
      {...props}
      className="overflow-x-auto rounded bg-gray-800 p-4 text-sm text-gray-100"
    />
  );
}

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function ImageCaption({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-4">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="rounded"
      />
      <figcaption className="mt-2 text-center text-sm text-gray-500">
        {caption}
      </figcaption>
    </figure>
  );
}

export const MDXComponents = {
  Callout,
  pre: CodeBlock,
  table: Table,
  ImageCaption,
};
