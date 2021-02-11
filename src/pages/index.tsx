import { useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import SEO from '@/components/SEO';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';
import { client } from '@/lib/prismic';
import { Title } from '../styles/pages/Home';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({recommendedProducts}: HomeProps) {

  const handleSum = useCallback(async () => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    const { sum } = (await import('../lib/math')).default;
    alert(sum(3, 5));
  }, []);

  return (
    <>
      <SEO 
        title="best online store in your world"
        titleSuffix={true}
        image="they-call-me-wolf.jpg"
      />
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(product => (
            <li key={product.id}>
              <Link href={`/catalog/products/${product.uid}`}>
                <a>
                {PrismicDOM.RichText.asText(product.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <button onClick={handleSum} >Soma</button>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
};
