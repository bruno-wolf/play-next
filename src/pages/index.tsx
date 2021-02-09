import { GetServerSideProps } from 'next';
import { useCallback } from 'react';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({recommendedProducts}: HomeProps) {

  const handleSum = useCallback(async () => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const { sum } = (await import('../lib/math')).default;
    alert(sum(3, 5));
  }, []);

  return (
    <>
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(product => (
            <li key={product.id}>
              {product.title}
            </li>
          ))}
        </ul>
      </section>

      <button onClick={handleSum} >Soma</button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);

  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    }
  }
};
