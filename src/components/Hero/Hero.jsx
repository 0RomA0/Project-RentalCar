import { NavLink } from 'react-router-dom';
import style from './Hero.module.css';

export default function Hero() {
  return (
    <>
      <section className={style.container}>
        <div className={style.infoContainer}>
          <h1 className={style.title}> Find your perfect rental car </h1>
          <p className={style.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <NavLink to={'/catalog'} className={style.btn}>
            View Catalog
          </NavLink>
        </div>
      </section>
    </>
  );
}
