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
      name: "",
      botanicalName: "",
      img: "https://images.unsplash.com/photo-1581573025746-0ee51aef032a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
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
      feedFrequency: Yup.number().positive().nullable(),
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
          placeholder="Spider Plant"
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
          placeholder="Chlorophytum comosum"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.botanicalName}
        />
        {formik.touched.botanicalName && formik.errors.botanicalName ? (
          <div className="error-msg">{formik.errors.botanicalName}</div>
        ) : null}

        <label htmlFor="img">
          Image (url) <span>or leave blank-</span>
        </label>
        <input
          id="img"
          name="img"
          type="url"
          placeholder="https://images/unsplash.com/photo-1"
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
          placeholder="7"
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
          placeholder="30"
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
          placeholder="Partial, shade"
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
          placeholder="Spider plants are often grown in containers as hanging plants due to the cascading nature of their foliage and their long stems with plantlets. 
          Regular watering is typically the most time-consuming part of spider plant care. Throughout the growing season (spring to fall) also plan to fertilize regularly. And repot your plant as needed once its roots have outgrown the container. "
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
          placeholder="11/06/2022"
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
          placeholder="11/01/2022"
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
