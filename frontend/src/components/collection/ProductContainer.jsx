import ProductComponent from "@/components/global/ProductComponent";

// ✅ Product Container
export const ProductContainer = () => {
  const products = [

    {
      index: 1,
      url: "/product/T-shirt/1",
      image_url: "https://picsum.photos/id/123/800/600",
      title: "sneaker one",
      original_title: "Sneaker 1",
      alt: "Sneaker One",
    },
    {
      index: 2,
      url: "/product/T-shirt/2",
      image_url: "https://picsum.photos/id/124/800/600",
      title: "sneaker two",
      original_title: "Sneaker 2",
      alt: "Sneaker Two",
    },
    {
      index: 3,
      url: "/product/T-shirt/3",
      image_url: "https://picsum.photos/id/125/800/600",
      title: "sneaker three",
      original_title: "Sneaker 3",
      alt: "Sneaker Three",
    },
    {
      index: 4,
      url: "/product/T-shirt/4",
      image_url: "https://picsum.photos/id/126/800/600",
      title: "sneaker four",
      original_title: "Sneaker 4",
      alt: "Sneaker Four",
    },
    {
      index: 5,
      url: "/product/T-shirt/5",
      image_url: "https://picsum.photos/id/127/800/600",
      title: "sneaker five",
      original_title: "Sneaker 5",
      alt: "Sneaker Five",
    },
    {
      index: 6,
      url: "/product/T-shirt/6",
      image_url: "https://picsum.photos/id/128/800/600",
      title: "sneaker six",
      original_title: "Sneaker 6",
      alt: "Sneaker Six",
    },
    {
      index: 7,
      url: "/product/T-shirt/7",
      image_url: "https://picsum.photos/id/129/800/600",
      title: "sneaker seven",
      original_title: "Sneaker 7",
      alt: "Sneaker Seven",
    },
    {
      index: 8,
      url: "/product/T-shirt/8",
      image_url: "https://picsum.photos/id/130/800/600",
      title: "sneaker eight",
      original_title: "Sneaker 8",
      alt: "Sneaker Eight",
    },
    {
      index: 9,
      url: "/product/T-shirt/9",
      image_url: "https://picsum.photos/id/131/800/600",
      title: "sneaker nine",
      original_title: "Sneaker 9",
      alt: "Sneaker Nine",
    },
    {
      index: 10,
      url: "/product/T-shirt/10",
      image_url: "https://picsum.photos/id/132/800/600",
      title: "sneaker ten",
      original_title: "Sneaker 10",
      alt: "Sneaker Ten",
    },
    {
      index: 11,
      url: "/product/T-shirt/11",
      image_url: "https://picsum.photos/id/133/800/600",
      title: "sneaker eleven",
      original_title: "Sneaker 11",
      alt: "Sneaker Eleven",
    },
    {
      index: 12,
      url: "/product/T-shirt/12",
      image_url: "https://picsum.photos/id/134/800/600",
      title: "sneaker twelve",
      original_title: "Sneaker 12",
      alt: "Sneaker Twelve",
    },
    {
      index: 13,
      url: "/product/T-shirt/13",
      image_url: "https://picsum.photos/id/135/800/600",
      title: "sneaker thirteen",
      original_title: "Sneaker 13",
      alt: "Sneaker Thirteen",
    },
    {
      index: 14,
      url: "/product/T-shirt/14",
      image_url: "https://picsum.photos/id/136/800/600",
      title: "sneaker fourteen",
      original_title: "Sneaker 14",
      alt: "Sneaker Fourteen",
    },
    {
      index: 15,
      url: "/product/T-shirt/15",
      image_url: "https://picsum.photos/id/137/800/600",
      title: "sneaker fifteen",
      original_title: "Sneaker 15",
      alt: "Sneaker Fifteen",
    },
    {
      index: 16,
      url: "/product/T-shirt/16",
      image_url: "https://picsum.photos/id/101/800/600",
      title: "sneaker sixteen",
      original_title: "Sneaker 16",
      alt: "Sneaker Sixteen",
    },
    {
      index: 17,
      url: "/product/T-shirt/17",
      image_url: "https://picsum.photos/id/139/800/600",
      title: "sneaker seventeen",
      original_title: "Sneaker 17",
      alt: "Sneaker Seventeen",
    },
    {
      index: 18,
      url: "/product/T-shirt/18",
      image_url: "https://picsum.photos/id/140/800/600",
      title: "sneaker eighteen",
      original_title: "Sneaker 18",
      alt: "Sneaker Eighteen",
    },
    {
      index: 19,
      url: "/product/T-shirt/19",
      image_url: "https://picsum.photos/id/141/800/600",
      title: "sneaker nineteen",
      original_title: "Sneaker 19",
      alt: "Sneaker Nineteen",
    },
    {
      index: 20,
      url: "/product/T-shirt/20",
      image_url: "https://picsum.photos/id/142/800/600",
      title: "sneaker twenty",
      original_title: "Sneaker 20",
      alt: "Sneaker Twenty",
    },
  ];


  return (
    <div className="flex flex-col items-center gap-10 xl:gap-20 w-full">
      <div className="grid gap-x-5 gap-y-7 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {products.map((product) => (
          <ProductComponent key={product.index} product={product} />
        ))}
      </div>
    </div>
  );
};