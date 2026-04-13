import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";

type RichTextProps = {
  value: PortableTextBlock[];
};

export function RichText({ value }: RichTextProps) {
  return (
    <div className="rich-text max-w-none text-slate-700">
      <PortableText value={value} />
    </div>
  );
}
