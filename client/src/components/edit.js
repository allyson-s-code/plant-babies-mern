import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./textError";

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

  async function postData(form) {
    // When a post request is sent to the update url, we'll update a record from the database.
    const updatedPlant = {
      name: form.name,
      botanicalName: form.botanicalName,
      img: form.img,
      waterFrequency: form.waterFrequency,
      feedFrequency: form.feedFrequency,
      light: form.light,
      care: form.care,
      waterDate: form.waterDate,
      feedDate: form.feedDate,
    };
    console.log(form.name);
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

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
    postData(values);
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

  return (
    <section className="create-section">
      <h2>Edit Your Plant</h2>

      <Formik
        initialValues={form}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form>
          <label htmlFor="name">Name:</label>
          <Field id="name" name="name" type="text" />
          <ErrorMessage name="name" component={TextError} />

          <label htmlFor="botanicalName">Botanical Name:</label>
          <Field id="botanicalName" name="botanicalName" type="text" />
          <ErrorMessage name="botanicalName" component={TextError} />

          <label htmlFor="img">
            Image (url) <span>or leave blank-</span>
          </label>
          <Field id="img" name="img" type="url" />
          <ErrorMessage name="img" component={TextError} />

          <label htmlFor="waterFrequency">Water Frequency (in days):</label>
          <Field id="waterFrequency" name="waterFrequency" type="number" />
          <ErrorMessage name="waterFrequency" component={TextError} />

          <label htmlFor="feedFrequency">Feed Frequency (in days):</label>
          <Field id="feedFrequency" name="feedFrequency" type="number" />
          <ErrorMessage name="feedFrequency" component={TextError} />

          <label htmlFor="light">Light:</label>
          <Field id="light" name="light" type="text" />
          <ErrorMessage name="light" component={TextError} />

          <label htmlFor="care">Care:</label>
          <Field as="textarea" id="care" name="care" type="text" />
          <ErrorMessage name="care" component={TextError} />

          <label htmlFor="waterDate">Next Water Date:</label>
          <Field id="waterDate" name="waterDate" type="date" />
          <ErrorMessage name="waterDate" component={TextError} />

          <label htmlFor="feedDate">Next Feed Date:</label>
          <Field id="feedDate" name="feedDate" type="date" />
          <ErrorMessage name="feedDate" component={TextError} />

          <button type="submit" className="submit-new__btn secondary">
            Submit
          </button>
        </Form>
      </Formik>
    </section>
  );
}
