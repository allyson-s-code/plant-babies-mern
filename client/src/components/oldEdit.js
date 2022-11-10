import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function UpdatePlantForm() {
  const [form, setForm] = useState({
    name: "",
    botanicalName: "",
    img: "",
    waterFrequency: "",
    feedFrequency: "",
    light: "",
    care: "",
    waterDate: "",
    feedDate: "",
  });

  const params = useParams();

  //fetches plant from database
  useEffect(() => {
    async function getFormValues() {
      const id = params.id;
      const response = await fetch(`http://localhost:4000/plants/${id}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);

        return;
      }
      setForm(record);
    }

    getFormValues();

    return;
  }, [params.id]);

  const savedValues = {
    name: form.name,
    botanicalName: form.botanicalName,
    img: form.img,
    waterFrequency: form.waterFrequency,
    feedFrequency: form.feedFrequency,
    light: form.light,
    care: form.care,
    waterDate: form.waterDate,
    feedDate: form.FeedDate,
  };

  console.log(savedValues);
  async function postData() {
    // When a post request is sent to the update url, we'll update a record from the database.
    const updatedPlant = { ...savedValues };
    const id = params.id;
    await fetch(`http://localhost:4000/${id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlant),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  const initialValues = {
    name: savedValues.name,
    botanicalName: form.botanicalName,
    img: form.img,
    waterFrequency: form.waterFrequency,
    feedFrequency: form.feedFrequency,
    light: form.light,
    care: form.care,
    waterDate: form.waterDate,
    feedDate: form.FeedDate,
  };

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    postData(values);
    console.log(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    botanicalName: Yup.string().required("Required"),
    img: Yup.string().url().nullable(),
    waterFrequency: Yup.number().positive().integer().required("Required"),
    feedFrequency: Yup.number().positive().nullable(),
    light: Yup.string().required("Required"),
    care: Yup.string().required("Required"),
    waterDate: Yup.string().required("Required"),
    feedDate: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  console.log("Form Values", formik.values);

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
          value={formik.values.name}
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
    /*return (
    <section className="create-section">
      <h2>Edit Your Plant</h2>

      //<Formik
        initialValues={savedValues}
        //validationSchema={validationSchema}
        //onSubmit={onSubmit}
        //enableReinitialize
      >
        <Form>
          <label htmlFor="name">Name:</label>
          <Field
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-msg">{formik.errors.name}</div>
          ) : null}

          <label htmlFor="botanicalName">Botanical Name:</label>
          <Field
            id="botanicalName"
            name="botanicalName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.botanicalName}
          />
          {formik.touched.botanicalName && formik.errors.botanicalName ? (
            <div className="error-msg">{formik.errors.botanicalName}</div>
          ) : null}

          <label htmlFor="img">
            Image (url) <span>or leave blank-</span>
          </label>
          <Field
            id="img"
            name="img"
            type="url"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.img && formik.errors.img ? (
            <div className="error-msg">{formik.errors.img}</div>
          ) : null}

          <label htmlFor="waterFrequency">Water Frequency (in days):</label>
          <Field
            id="waterFrequency"
            name="waterFrequency"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.waterFrequency && formik.errors.waterFrequency ? (
            <div className="error-msg">{formik.errors.waterFrequency}</div>
          ) : null}

          <label htmlFor="feedFrequency">Feed Frequency (in days):</label>
          <Field
            id="feedFrequency"
            name="feedFrequency"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.feedFrequency && formik.errors.feedFrequency ? (
            <div className="error-msg">{formik.errors.feedFrequency}</div>
          ) : null}

          <label htmlFor="light">Light:</label>
          <Field
            id="light"
            name="light"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.light && formik.errors.light ? (
            <div className="error-msg">{formik.errors.light}</div>
          ) : null}

          <label htmlFor="care">Care:</label>
          <Field
            id="care"
            name="care"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="care-input"
          />
          {formik.touched.care && formik.errors.care ? (
            <div className="error-msg">{formik.errors.care}</div>
          ) : null}

          <label htmlFor="waterDate">Next Water Date:</label>
          <Field
            id="waterDate"
            name="waterDate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.waterDate && formik.errors.waterDate ? (
            <div className="error-msg">{formik.errors.waterDate}</div>
          ) : null}

          <label htmlFor="feedDate">Next Feed Date:</label>
          <Field
            id="feedDate"
            name="feedDate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.feedDate && formik.errors.feedDate ? (
            <div className="error-msg">{formik.errors.feedDate}</div>
          ) : null}

          <button type="submit" className="submit-new__btn secondary">
            Submit
          </button>
        </Form>
      </Formik>
    </section>*/
  );
}
