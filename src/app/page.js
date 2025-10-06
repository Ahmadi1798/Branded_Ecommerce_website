import { Product, FooterBanner, HeroBanner, Footer } from '../../components';
import { client } from '../../lib/client';
const page = async () => {
  const query = '*[_type == "product"]';
  const productsData = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  console.log(productsData);

  // Transform product data to plain objects
  const products = productsData.map((product) => ({
    _id: product._id,
    _type: product._type,
    _createdAt: product._createdAt,
    _updatedAt: product._updatedAt,
    name: product.name,
    price: product.price,
    details: product.details,
    // Transform slug to plain object
    slug: product.slug
      ? {
          _type: product.slug._type,
          current: product.slug.current,
        }
      : null,
    // Transform image array to plain objects
    image: product.image
      ? product.image.map((img) => ({
          _type: img._type,
          asset: {
            _ref: img.asset?._ref,
            _type: img.asset?._type,
          },
          // Include other image properties if needed
          hotspot: img.hotspot
            ? {
                x: img.hotspot.x,
                y: img.hotspot.y,
                height: img.hotspot.height,
                width: img.hotspot.width,
              }
            : null,
          crop: img.crop
            ? {
                top: img.crop.top,
                bottom: img.crop.bottom,
                left: img.crop.left,
                right: img.crop.right,
              }
            : null,
        }))
      : [],
  }));
  const banner = bannerData.map((item) => ({
    _id: item._id,
    _type: item._type,
    buttonText: item.buttonText,
    product: item.product,
    desc: item.desc,
    smallText: item.smallText,
    midText: item.midText,
    largeText1: item.largeText1,
    largeText2: item.largeText2,
    discount: item.discount,
    saleTime: item.saleTime,
    // Convert image to a plain object
    image: item.image
      ? {
          _type: item.image._type,
          asset: {
            _ref: item.image.asset._ref,
            _type: item.image.asset._type,
          },
        }
      : null,
  }));

  return (
    <>
      <HeroBanner herobanner={banner.length && banner[0]} />

      <div className="w-full mt-20 flex flex-col items-center">
        <h2 className="text-4xl font-bold">Best Selling Products</h2>
        <p className="font-[200px] text-xl">Speakers of many variations</p>
      </div>
      <div className="flex flex-wrap justify-center space-x-10 mt-10">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={banner.length && banner[0]} />
    </>
  );
};

export default page;
