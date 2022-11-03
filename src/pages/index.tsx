import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { HomeContainer, Navigator, Product } from "../styles/pages/home";

import "keen-slider/keen-slider.min.css";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [showing, setShowing] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      origin: "center",

      perView: 2,
      spacing: 48,
    },
    slideChanged: (slider) => setShowing(slider.track.details.rel),
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {showing > 0 && (
          <Navigator
            orientation="left"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7071 26.7071C20.3166 27.0976 19.6834 27.0976 19.2929 26.7071L9.29289 16.7071C8.90237 16.3166 8.90237 15.6834 9.29289 15.2929L19.2929 5.29289C19.6834 4.90237 20.3166 4.90237 20.7071 5.29289C21.0976 5.68342 21.0976 6.31658 20.7071 6.70711L11.4142 16L20.7071 25.2929C21.0976 25.6834 21.0976 26.3166 20.7071 26.7071Z"
                fill="#C4C4CC"
              />
            </svg>
          </Navigator>
        )}
        {products.map((product, index) => (
          <Product
            href={`product/${product.id}`}
            key={product.id}
            className="keen-slider__slide"
            showing={showing === index}
          >
            <figure>
              <Image src={product.imageUrl} fill alt={product.name} />
            </figure>
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        ))}
        {showing < products.length - 1 && (
          <Navigator
            orientation="right"
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289L22.7071 15.2929C23.0976 15.6834 23.0976 16.3166 22.7071 16.7071L12.7071 26.7071C12.3166 27.0976 11.6834 27.0976 11.2929 26.7071C10.9024 26.3166 10.9024 25.6834 11.2929 25.2929L20.5858 16L11.2929 6.70711C10.9024 6.31658 10.9024 5.68342 11.2929 5.29289Z"
                fill="#C4C4CC"
              />
            </svg>
          </Navigator>
        )}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
      imageUrl: product.images[0],
    };
  });

  return {
    props: {
      products,
    },
  };
};
