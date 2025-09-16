import style from './NotFoundCars.module.css';

export default function NotFoundCars() {
  return (
    <div className={style.div}>
      <h1 className={style.title}> Sorry nothing found </h1>
      <p className={style.text}> Please reload the page. </p>
    </div>
  );
}
