"use client";

import type { ProductItem } from "@/data/boutique-data";

const sizeOrder = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

export default function VariantSelector({ variants, selected, onSelect }: {
  variants: ProductItem[];
  selected: ProductItem;
  onSelect: (variant: ProductItem) => void;
}) {
  const sizes = [...new Set(variants.map((item) => item.size).filter((value): value is string => Boolean(value)))].sort((first, second) => {
    const firstIndex = sizeOrder.indexOf(first.toUpperCase());
    const secondIndex = sizeOrder.indexOf(second.toUpperCase());
    return (firstIndex < 0 ? sizeOrder.length : firstIndex) - (secondIndex < 0 ? sizeOrder.length : secondIndex) || first.localeCompare(second);
  });
  const colours = [...new Set(variants.map((item) => item.color).filter((value): value is string => Boolean(value)))].sort((first, second) => first.localeCompare(second));

  const chooseSize = (size: string) => {
    const matching = variants.filter((item) => item.size === size);
    const next = matching.find((item) => item.color === selected.color) ?? matching.find((item) => (item.availableStock ?? 0) > 0) ?? matching[0];
    if (next) onSelect(next);
  };

  const chooseColour = (colour: string) => {
    const next = variants.find((item) => item.size === selected.size && item.color === colour);
    if (next) onSelect(next);
  };

  return (
    <div className="space-y-5">
      {sizes.length > 0 && <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-[0.17em] text-rosepetal-wine">Size</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((size) => {
            const selectedSize = selected.size === size;
            const allSoldOut = variants.filter((item) => item.size === size).every((item) => (item.availableStock ?? 0) < 1);
            return <button key={size} type="button" onClick={() => chooseSize(size)} aria-pressed={selectedSize} aria-label={`Size ${size}${allSoldOut ? ", sold out" : ""}`} className={`min-h-11 min-w-12 rounded-md border px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine ${selectedSize ? "border-rosepetal-wine bg-rosepetal-wine text-white" : "border-rosepetal-border bg-white text-rosepetal-text hover:border-rosepetal-wine"} ${allSoldOut ? "opacity-60" : ""}`}>{size.toUpperCase()}</button>;
          })}
        </div>
      </fieldset>}
      {colours.length > 0 && <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-[0.17em] text-rosepetal-wine">Colour <span className="ml-2 font-normal normal-case tracking-normal text-rosepetal-muted">{selected.color}</span></legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {colours.map((colour) => {
            const option = variants.find((item) => item.size === selected.size && item.color === colour);
            const selectedColour = selected.color === colour;
            return <button key={colour} type="button" onClick={() => chooseColour(colour)} disabled={!option} aria-pressed={selectedColour} aria-label={`Colour ${colour}${option && (option.availableStock ?? 0) < 1 ? ", sold out" : ""}`} className={`min-h-11 rounded-md border px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine ${selectedColour ? "border-rosepetal-wine bg-rosepetal-wine text-white" : "border-rosepetal-border bg-white text-rosepetal-text hover:border-rosepetal-wine"} disabled:cursor-not-allowed disabled:opacity-40`}>{colour}</button>;
          })}
        </div>
      </fieldset>}
    </div>
  );
}
