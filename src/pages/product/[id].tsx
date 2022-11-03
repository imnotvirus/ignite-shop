import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
interface ProductProps {
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
  };
}
export default function DetailProduct({ product }: ProductProps) {
  const { isFallback } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer>
        <figure>
          {!isFallback && (
            <Image src={product.imageUrl} fill alt={product.name} />
          )}
        </figure>
      </ImageContainer>

      <ProductDetails>
        <h1>{product?.name}</h1>
        <span>{product?.price}</span>

        <p>{product?.description}</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_MjIw0HnvlH8mgH" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  const product = await stripe.products.retrieve(productId!, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        imageUrl: product.images[0],
        description: product.description,
      },
    },
    revalidate: 60 * 60 * 1, //1 hour
  };
};
