import Hero from '../../components/Hero/Hero';
import style from './HomePage.module.css';

export default function Homepage() {
  return (
    <>
      <div className={style.container}>
        <Hero />
      </div>
    </>
  );
}
