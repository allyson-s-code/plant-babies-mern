import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function NewPlant() {
  async function postData() {
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPlant = { ...formik.values };

    await fetch("http://localhost:4000/plants/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  const formik = useFormik({
    initialValues: {
      _id: 14,
      name: "",
      botanicalName: "",
      img: "https://lh3.googleusercontent.com/LN7eI5sheAf-rAnKHRPSs-FRfEkNS_3eUzgbX_uaYrW4r1PJQFRzzkLHy4kd2JDRJWnFXFNCYlRaeHNLdespTsSwmHNoruZktJFF8iRv8XRcmMcANESE9jUFXaEmhe8U4Lqoyys0dehFrc7WY4geezSf7pb1AF1QnfJMHU4Tvg8NadhsrvZhZBZAf5FDXVlFEjyqSXSheg8OtMqkVpJh6gkuGMy79-ZPvEZnVYEhZEjMhUY952zyzHS25UGUiVM7mwa_JVdYo2Y4cGOK96jY0KDM0itXAAhTXd-qFAcWd5u4I-UFDnGqQOVdr-OsWdnDqXmwd73EoWo70lDKFNt3UPjzo4Y_jBZhT6YaB0m7h2feVrHHf-pKrNqc0bxEz8YB8kPup3138HabwAwQI9i-oop95uPLeGa_VGZlSFAyJw4mI4gFfXKHTpSmG85hXpZ8ckDCifiidC5wXc-llRa1s6B-_D8BphnNIV5fPLEOt_sLFeKhKI0a13o3ZNOE2-NaouSbBccZrfpwneSMrp5sL47CmrEbI1WGwh0OVdWmTYYQGW4zb-4c0JeDc46Dxin9OOhADAIjlel1Ro7cuKDgSltv_xqyHT8JzG5B5-LJ-iwjWrlhvE7b6WA0PyT0q6gZZVQ1gnZw2dEimeR_0MFfaAnTq5KLcYbYcMV-XJ-piBY1rzbdevAVgF5yf-RVPvkOTg9X76qs7N298OarjhXrBSgkBELRMc4Y4iVP9RH31SbY-jeTmo-TTaeS8m5YybrUvMh9I2xZGlTaHXD65z8FGUtjO_sUetw3h7NR3Pa_o0QgYV01eQkUz7P5teaCSatkjvwJhNgpEUjU9-mURsZMP2O7MDRWXmvGm2uUARfsfcpr6SHD7Rii1YyJis9bAjVCu9CBw3b0K9EztgWgQXnmtD6K9jNFWgsPYpDK94VJZdFcKVLmhg=s500-no?authuser=0",
      waterFrequency: 7,
      feedFrequency: null,
      light: "",
      care: "",
      waterDate: "",
      feedDate: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      botanicalName: Yup.string().required("Required"),
      img: Yup.string().url().nullable(),
      waterFrequency: Yup.number().required("Required").positive().integer(),
      feedFrequency: Yup.number().positive().integer().nullable(),
      light: Yup.string().required("Required"),
      care: Yup.string().required("Required"),
      waterDate: Yup.string().required("Required"),
      feedDate: Yup.string().nullable(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      postData(values);
      console.log(values);
    },
  });

  console.log(formik.values);
  return (
    <section className="create-section">
      <h2>Add a New Plant!</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error-msg">{formik.errors.name}</div>
        ) : null}

        <label htmlFor="botanicalName">Botanical Name:</label>
        <input
          id="botanicalName"
          name="botanicalName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.botanicalName}
        />
        {formik.touched.botanicalName && formik.errors.botanicalName ? (
          <div className="error-msg">{formik.errors.botanicalName}</div>
        ) : null}

        <label htmlFor="img">Image (url only):</label>
        <input
          id="img"
          name="img"
          type="url"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.img && formik.errors.img ? (
          <div className="error-msg">{formik.errors.img}</div>
        ) : null}

        <label htmlFor="waterFrequency">Water Frequency (in days):</label>
        <input
          id="waterFrequency"
          name="waterFrequency"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.waterFrequency && formik.errors.waterFrequency ? (
          <div className="error-msg">{formik.errors.waterFrequency}</div>
        ) : null}

        <label htmlFor="feedFrequency">Feed Frequency (in days):</label>
        <input
          id="feedFrequency"
          name="feedFrequency"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.feedFrequency && formik.errors.feedFrequency ? (
          <div className="error-msg">{formik.errors.feedFrequency}</div>
        ) : null}

        <label htmlFor="light">Light:</label>
        <input
          id="light"
          name="light"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.light && formik.errors.light ? (
          <div className="error-msg">{formik.errors.light}</div>
        ) : null}

        <label htmlFor="care">Care:</label>
        <textarea
          id="care"
          name="care"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="care-input"
        />
        {formik.touched.care && formik.errors.care ? (
          <div className="error-msg">{formik.errors.care}</div>
        ) : null}

        <label htmlFor="waterDate">Next Water Date:</label>
        <input
          id="waterDate"
          name="waterDate"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.waterDate && formik.errors.waterDate ? (
          <div className="error-msg">{formik.errors.waterDate}</div>
        ) : null}

        <label htmlFor="feedDate">Next Feed Date:</label>
        <input
          id="feedDate"
          name="feedDate"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.feedDate && formik.errors.feedDate ? (
          <div className="error-msg">{formik.errors.feedDate}</div>
        ) : null}

        <button type="submit" className="submit-new__btn secondary">
          Submit
        </button>
      </form>
    </section>
  );
}
