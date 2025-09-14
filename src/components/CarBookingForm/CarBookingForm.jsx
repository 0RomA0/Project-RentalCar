import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "./CarBookingForm.module.css";
import BookingDatePicker from "../BookingDatePicker/BookingDatePicker";
import toast, { Toaster } from "react-hot-toast";

export default function CarBookingForm() {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(30, "Maximum 30 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    date: Yup.array()
      .of(Yup.date().nullable())
      .test("startDate", "Date is required", (value) => value && value[0] != null)
      .required("Date is required"),
    comment: Yup.string().max(200, "Max 200 characters"),
  });


  const handleSubmit = (values, actions) => {
    toast.success('You have successfully rented a car.');

    actions.resetForm();
  
  }

  return (

    <>
    <Formik
      initialValues={{
        name: "",
        email: "",
        date: [null, null],
        comment: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className={style.form}>
          <div className={style.formContent}>
            <Field
              type="text"
              name="name"
              placeholder="Name*"
              className={style.input}
            />
            <ErrorMessage name="name" component="p" className={style.error} />

            <Field
              type="email"
              name="email"
              placeholder="Email*"
              className={style.input}
            />
            <ErrorMessage name="email" component="p" className={style.error} />

            {/* BookingDatePicker інтеграція через setFieldValue */}
            <BookingDatePicker 
              value={values.date}
              onChange={(range) => setFieldValue("date", range)}
            />
            <ErrorMessage name="date" component="p" className={style.error} />

            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={style.textarea}
            />
            <ErrorMessage name="comment" component="p" className={style.error} />
          </div>

          <button type="submit" className={style.btnForm}>
            Send
          </button>
        </Form>
      )}
    </Formik>

    <Toaster
      position="top-right"
      reverseOrder={false}/>
    
</>
  );
}
