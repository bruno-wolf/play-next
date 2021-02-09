import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';

const Modal = dynamic(
  () => import('@/components/Modal'),
  { loading: () => <p>Loading... </p>, ssr: false }
)

export default function Product() {
  const router = useRouter();
  const [ modalVisibility, setModalVisibility ] = useState(false);

  const handleAddToCart = useCallback(() => {
    setModalVisibility(!modalVisibility);
  }, [modalVisibility]);

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      { modalVisibility && <Modal />}
    </div>
  )
}