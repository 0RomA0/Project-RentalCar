import style from "./CatalogList.module.css"

import { useDispatch, useSelector } from "react-redux"
import { selectCars, selectIsLoading, selectPage, selectTotalPages } from "../../redux/cars/selectors"
import CarInfo from "../CarInfo/CarInfo";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { loadMoreCars } from "../../redux/cars/operations";
import { setPage } from "../../redux/cars/slice";
import { selectFilters } from "../../redux/filters/selectors";
import NotFoundCars from "../NotFoundCars/NotFoundcars";

export default function CatalogList() {

    const dispatch = useDispatch();
    const cars = useSelector(selectCars);
    const isLoading = useSelector(selectIsLoading);
    const page = useSelector(selectPage);
    const totalPages = useSelector(selectTotalPages);
    const filters = useSelector(selectFilters);

    const handleLoadMore = () => {
        if (!isLoading && totalPages) {
      const nextPage = page + 1;
            dispatch(setPage(nextPage));
            dispatch(loadMoreCars({
                page: nextPage,
                brand: filters.brand || undefined,
                price: filters.price || undefined,
                minMileage: filters.minMileage || undefined,
                maxMileage: filters.maxMileage || undefined,
      })
    );
    }
    };
    
    if (!isLoading && cars.length === 0) {
        return <NotFoundCars/>
    }

    return (
        <div className={style.container}>
        <ul className={style.list}>
        { cars.map((car) =>
        <li className={style.item} key={car.id}>
                <CarInfo
                    carBrand={car.brand}
                    carModel={car.model}
                    productionYear={car.year}
                    carPhoto={car.img}
                    address={car.address}
                    carMileage={car.mileage}
                    rentalPrice={car.rentalPrice}
                    carId={car.id}
                    carType={car.type}
                    rentalCompany={car.rentalCompany}
                />
        </li>
            )}
            </ul>

             {/* Лоадер при дозавантаженні */}
    {isLoading && (
      <div className={style.loaderWrapper}>
        <div className={style.loader}></div>
      </div>
    )}
            {page < totalPages && !isLoading && cars.length > 0 && (
                <div className={style.loadMoreWrapper}>
                    <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
                </div>
            )}
        </div>
    )
}