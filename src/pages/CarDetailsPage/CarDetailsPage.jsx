import style from './CarDetailsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCar, selectIsLoading } from '../../redux/cars/selectors';
import { useEffect } from 'react';
import { fetchCarById } from '../../redux/cars/operations';
import { useParams } from 'react-router-dom';
import CarBookingForm from '../../components/CarBookingForm/CarBookingForm';
import { formatMileage } from '../../utils/formatter';

export default function CarDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [id, dispatch]);

  if (isLoading || !car) {
    return (
      <div className={style.loaderWrapper}>
        <div className={style.loader}></div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.containerImgForm}>
        <img className={style.img} src={car.img} alt={car.brand} />

        <div className={style.formWrapper}>
          <h3 className={style.formTitle}> Book your car now </h3>
          <p className={style.formSubtitle}>
            Stay connected! We are always ready to help you.
          </p>
          <CarBookingForm />
        </div>
      </div>

      <div className={style.textContainer}>
        <div className={style.descrCarContainer}>
          <h2 className={style.brandText}>
            {car.brand} {car.model},
          </h2>
          <p>{car.year}</p>
        </div>
        <div className={style.addressInfo}>
          <p className={style.address}>
            <svg className={style.icon}>
              <use href="/sprite.svg#icon-location" />
            </svg>
            {car.address}
          </p>
          <p className={style.mileage}>Mileage: {formatMileage(car.mileage)}</p>
        </div>
        <p className={style.price}> ${car.rentalPrice} </p>

        <p className={style.desrcCar}> {car.description} </p>

        <div className={style.conditions}>
          <h3>Rental Conditions:</h3>
          <ul>
            {car.rentalConditions.map((cond, idx) => (
              <li className={style.itemCond} key={idx}>
                <svg className={style.icon}>
                  <use href="/sprite.svg#icon-check-circle" />
                </svg>
                <p> {cond} </p>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.specific}>
          <h3> Car Specifications: </h3>
          <p>
            <svg className={style.icon}>
              <use href="/sprite.svg#icon-calendar" />
            </svg>
            Year: {car.year}
          </p>
          <p>
            <svg className={style.icon}>
              <use href="/sprite.svg#icon-car" />
            </svg>
            Type: {car.type}
          </p>
          <p>
            <svg className={style.icon}>
              <use href="/sprite.svg#icon-fuel-pump" />
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </p>
          <p>
            <svg className={style.icon}>
              <use href="/sprite.svg#icon-gear" />
            </svg>
            Engine Size: {car.engineSize}
          </p>
        </div>

        <div className={style.extra}>
          <h3>Accessories & Functionalities:</h3>
          <ul>
            {car.accessories.map((acc, idx) => (
              <li key={idx}>
                <svg className={style.icon}>
                  <use href="/sprite.svg#icon-check-circle" />
                </svg>
                <p> {acc} </p>
              </li>
            ))}
            {car.functionalities.map((func, idx) => (
              <li key={idx}>
                <svg className={style.icon}>
                  <use href="/sprite.svg#icon-check-circle" />
                </svg>
                <p> {func} </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
