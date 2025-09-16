import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Filters.module.css';
import {
  setBrand,
  setPrice,
  setMileageFrom,
  setMileageTo,
  resetFilters,
} from '../../redux/filters/slice';
import { fetchBrands } from '../../redux/filters/operations';
import { selectFilters } from '../../redux/filters/selectors';
import { fetchCars } from '../../redux/cars/operations';
import { resetCars, setPage } from '../../redux/cars/slice';

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(false);

  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  useEffect(() => {
    setBrandsLoading(true);
    dispatch(fetchBrands())
      .unwrap()
      .then((data) => setBrands(data))
      .catch(console.error)
      .finally(() => setBrandsLoading(false));
  }, [dispatch]);

  const priceList = [20, 30, 40, 50, 60, 70, 80, 90, 100];

  const isFiltersSelected =
    filters.brand ||
    filters.rentalPrice ||
    filters.minMileage ||
    filters.maxMileage;

  const handleSearch = () => {
    dispatch(resetCars());
    dispatch(setPage(1));
    dispatch(
      fetchCars({
        page: 1,
        limit: 12,
        brand: filters.brand || undefined,
        rentalPrice: filters.rentalPrice || undefined,
        minMileage: filters.minMileage || undefined,
        maxMileage: filters.maxMileage || undefined,
      }),
    );
  };

  const handleClear = () => {
    dispatch(resetFilters());
    dispatch(resetCars());
    dispatch(setPage(1));
    dispatch(fetchCars({ page: 1, limit: 12 }));
  };

  return (
    <div className={style.filterContainer}>
      {/* Brand */}

      <div className={style.selectWrapper}>
        <label className={style.label}> Car brand </label>
        <div
          className={style.selectHeader}
          onClick={() => setBrandOpen(!brandOpen)}
        >
          {filters.brand || (brandsLoading ? 'Loading...' : 'Choose a brand')}
          <svg className={style.icon}>
            <use
              href={`/sprite.svg#${
                brandOpen ? 'icon-arrow-up' : 'icon-arrow-down'
              }`}
            />
          </svg>
        </div>
        {brandOpen && (
          <ul className={style.selectList}>
            {brands.map((brand) => (
              <li
                key={brand}
                className={filters.brand === brand ? style.active : ''}
                onClick={() => {
                  dispatch(setBrand(brand));
                  setBrandOpen(false);
                }}
              >
                {brand}
              </li>
            ))}
            <li
              onClick={() => {
                dispatch(setBrand(''));
                setBrandOpen(false);
              }}
            >
              Clear
            </li>
          </ul>
        )}
      </div>

      {/* Price */}

      <div className={style.selectWrapper}>
        <label className={style.label}> Price/ 1 hour </label>
        <div
          className={style.selectHeader}
          onClick={() => setPriceOpen(!priceOpen)}
        >
          {filters.rentalPrice
            ? `${filters.rentalPrice} $/h`
            : 'Choose a price'}
          <svg className={style.icon}>
            <use
              href={`/sprite.svg#${
                priceOpen ? 'icon-arrow-up' : 'icon-arrow-down'
              }`}
            />
          </svg>
        </div>
        {priceOpen && (
          <ul className={style.selectList}>
            {priceList.map((price) => (
              <li
                key={price}
                className={filters.rentalPrice === price ? style.active : ''}
                onClick={() => {
                  dispatch(setPrice(price));
                  setPriceOpen(false);
                }}
              >
                {price}
              </li>
            ))}
            <li
              onClick={() => {
                dispatch(setPrice(''));
                setPriceOpen(false);
              }}
            >
              Clear
            </li>
          </ul>
        )}
      </div>

      {/* Mileage */}
      <div className={style.inputWrapper}>
        <label className={style.label}> Car mileage / km </label>
        <div className={style.inputContainer}>
          <div className={style.inputWrapper}>
            <span className={style.inputLabel}>From</span>
            <input
              className={style.inputFrom}
              type="text"
              value={filters.minMileage}
              onChange={(e) => dispatch(setMileageFrom(e.target.value))}
            />
          </div>

          <div className={style.inputWrapper}>
            <span className={style.inputLabel}>To</span>
            <input
              className={style.inputTo}
              type="text"
              value={filters.maxMileage}
              onChange={(e) => dispatch(setMileageTo(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <button
        className={style.btn}
        onClick={handleSearch}
        disabled={!isFiltersSelected}
      >
        Search
      </button>
      <button
        className={style.btn}
        onClick={handleClear}
        disabled={!isFiltersSelected}
      >
        Reset
      </button>
    </div>
  );
}
