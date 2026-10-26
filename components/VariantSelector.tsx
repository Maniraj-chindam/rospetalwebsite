"use client";

import type { ProductItem } from "@/data/boutique-data";

const sizeOrder = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

const swatchColours: Record<string, string> = {
  black: "#211D1E", white: "#FFFFFF", ivory: "#F7F0DF", cream: "#FFF3D6",
  beige: "#D8C5A6", brown: "#70503C", "dark brown": "#4D302C", tan: "#B48358",
  red: "#C3263E", maroon: "#6A1C32", burgundy: "#6B263B", wine: "#722C49",
  pink: "#E73D83", "baby pink": "#F4B9CD", "light pink": "#F3ABC7",
  rose: "#C76985", magenta: "#B21C73", peach: "#F2A58B", coral: "#F07871",
  orange: "#E77827", rust: "#A94F2F", yellow: "#E8C644", mustard: "#B6922D",
  gold: "#C3A355", golden: "#C3A355", silver: "#B6B8BD", grey: "#898B90", gray: "#898B90",
  green: "#3E8057", "dark green": "#28543B", olive: "#7E8450", mint: "#9FCDB6",
  blue: "#376BAA", "navy blue": "#263B63", navy: "#263B63", "sky blue": "#86BCE4",
  teal: "#358C8B", turquoise: "#52AAA5", purple: "#755199", violet: "#8153A2",
  lavender: "#BCA4D7", lilac: "#C6ABD6", mauve: "#A27397",
};

function swatchColour(name: string) {
  return swatchColours[name.trim().toLowerCase().replace(/\s+/g, " ")];
}

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
        <div className="mt-3 flex flex-wrap gap-1.5">
          {colours.map((colour) => {
            const option = variants.find((item) => item.size === selected.size && item.color === colour);
            const selectedColour = selected.color === colour;
            const fill = swatchColour(colour);
            return <button key={colour} type="button" onClick={() => chooseColour(colour)} disabled={!option} aria-pressed={selectedColour} aria-label={`Colour ${colour}${option && (option.availableStock ?? 0) < 1 ? ", sold out" : ""}`} title={colour} className={`inline-flex size-11 items-center justify-center rounded-md border-2 bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosepetal-wine ${selectedColour ? "border-rosepetal-wine" : "border-rosepetal-border hover:border-rosepetal-wine"} disabled:cursor-not-allowed disabled:opacity-40`}><span aria-hidden="true" className={`flex size-7 items-center justify-center rounded-[2px] border border-black/10 text-[10px] font-semibold uppercase text-rosepetal-wine ${fill ? "" : "bg-rosepetal-card"}`} style={fill ? { backgroundColor: fill } : undefined}>{fill ? "" : colour.slice(0, 2)}</span></button>;
          })}
        </div>
      </fieldset>}
    </div>
  );
}
