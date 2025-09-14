import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./BookingDatePicker.module.css";

export default function BookingDatePicker({ onChange, value }) {
  const [startDate, endDate] = value || [null, null];
  return (
    <div>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => onChange(update)}
        dateFormat="dd/MM/yyyy"
        className={style.inputDate}
        placeholderText="Booking date"
        minDate={new Date()}
        isClearable
        wrapperClassName={style.dateWrapper}
      />

      
    </div>
  );
}
