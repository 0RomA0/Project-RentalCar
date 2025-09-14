import { NavLink } from "react-router-dom"
import style from "./CarInfo.module.css"
import { toggleFavorite } from "../../redux/favorites/slice";
import { selectFavorites } from "../../redux/favorites/selectors";
import { useDispatch, useSelector } from "react-redux";


export default function CarInfo({ carBrand, carModel, productionYear,
    carPhoto, address, carMileage, rentalPrice, carId, carType, rentalCompany }) {


    const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  // чи є це авто в списку улюблених
  const isFavorite = favorites.includes(carId);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(carId));
    };
    

    const addressParts = address.split(",").map(p => p.trim());
    const city = addressParts[1];
    const country = addressParts[2];


    return (

        <div className={style.card}>
            <div>
            <div className={style.imgWrapper}>
                <img className={style.img} src={carPhoto} alt={carBrand} />
                    <button onClick={handleToggleFavorite} className={style.heartBtn}>
                        <svg className={style.heartIcon}>
                            <use href={`/public/sprite.svg#${isFavorite ? "icon-blue-heart" : "icon-heart"}`} />
                        </svg>
                    </button>
            </div>
                <div className={style.infoContainer}>
                <div className={style.textContainer}>
                    <p className={style.brandText}>{carBrand}</p>
                    <p className={style.modelText}>{carModel} <span className={style.span}>,</span></p>
                    <p>{productionYear}</p>
                </div>
                    <p className={style.price}> ${rentalPrice} </p>
                        
                    <div className={style.detailsRow}>
                        <span className={style.address}>
                            {city} <span className={style.separator}>|</span>
                            {country} <span className={style.separator}>|</span>
                            {rentalCompany} <span className={style.separator}>|</span>
                        </span>
                        <div>
                            <span className={style.carType}> {carType} </span> <span className={style.separator}> | </span>
                             <span className={style.mileage}>
                            {carMileage.toLocaleString("en-US").replaceAll(",", " ")} km
                        </span>
                        </div>
                       
                    </div>
                </div>
        </div>
            <NavLink to={`/cars/${carId}`} className={style.btn}> Read more </NavLink>
          
        </div>
    )
}


