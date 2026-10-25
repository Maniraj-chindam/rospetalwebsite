import type { ProductItem } from '@/data/boutique-data';

export default function ProductPrice({product}:{product:ProductItem}) {
  const discounted=product.actualPriceNum!==undefined&&product.actualPriceNum>product.priceNum;
  return <>{discounted&&<><span className="sr-only">Actual price </span><s className="mr-2 text-sm font-normal text-rosepetal-muted">{product.actualPrice}</s><span className="sr-only">Sale price </span></>}{product.price}</>;
}
