import ProductCard from './product-card';

type DisplayProductProps = {
  products: ProductData[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export function DisplayProducts(props: DisplayProductProps): JSX.Element {
  return (
    <div>
      <div className="flex flex-row items-start">
        <p className="text-black font-bold mb-5 text-xl">Products</p>
        <p className="text-gray-500 font-bold mb-5 ml-1 text-xl">()</p>
      </div>

      <div className="flex flex-row items-start bg-white border border-gray-200 rounded-xl shadow-sm p-4 gap-7 flex-wrap">
        {props.products.map((p, i) => (
          <ProductCard
            key={i}
            name={p.name}
            price={p.price}
            category={p.category}
            stock={p.stock}
            onEdit={() => props.onEdit?.(i)}
            onDelete={() => props.onDelete?.(i)}
          />
        ))}
      </div>
    </div>
  );
}
