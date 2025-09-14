import style from "./CatalogPage.module.css"

import { useEffect } from "react";
import CatalogList from "../../components/CatalogList/CatalogList";
import { useDispatch } from "react-redux";
import { fetchCars } from "../../redux/cars/operations";
import Filters from "../../components/Filters/Filters";



export default function ContactsPage() {


    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(fetchCars({ page: 1, limit: 12 }));
    }, [dispatch])
    
    

    return (

        <div className={style.container}>
            <Filters />
            <CatalogList />
        </div>

    )
}