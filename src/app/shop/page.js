import { client } from '../../../lib/client';
import { Product } from '../../../components';

const ShopPage = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="font-poppins text-5xl font-bold text-gray-800 mb-4">
          Shop All Products
        </h1>
        <p className="font-roboto text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our curated collection of high-quality, stylish products.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
