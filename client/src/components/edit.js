import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./textError";
import { Link } from "react-router-dom";

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
      const response = await fetch(
        `https://plant-babies-server.cyclic.app/plants/${id}`
      );

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

  const onSubmit = async (values, actions) => {
    const updatedPlant = {
      name: values.name,
      botanicalName: values.botanicalName,
      img: values.img,
      waterFrequency: values.waterFrequency,
      feedFrequency: values.feedFrequency,
      light: values.light,
      care: values.care,
      waterDate: values.waterDate,
      feedDate: values.feedDate,
    };
    const id = params.id;
    alert(JSON.stringify(values, null, 2));

    // When a post request is sent to the edit url, we'll update a record from the database.
    const response = await fetch(
      `https://plant-babies-server.cyclic.app/${id}/edit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlant),
      }
    ).catch((error) => {
      window.alert(error);
      return;
    });
    if (response) {
      actions.setSubmitting(false);
      actions.setStatus("sent");
      console.log("your plant baby has been updated:)");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    botanicalName: Yup.string().required("Required"),
    img: Yup.string().url().nullable(),
    waterFrequency: Yup.number().positive().integer().required("Required"),
    feedFrequency: Yup.number().positive().integer().required("Required"),
    light: Yup.string().required("Required"),
    care: Yup.string().required("Required"),
    waterDate: Yup.string().required("Required"),
    feedDate: Yup.string().required("Required"),
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
        {(formik) => {
          return (
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

              {formik.status === "sent" ? (
                <div className="success-msg">
                  <h3>Your Plant Baby has been updated :)</h3>
                  <div>
                    <Link to={`/home`}>
                      <button type="button" className="secondary">
                        Home
                      </button>
                    </Link>
                    <Link to={`/plants`}>
                      <button type="button" className="secondary">
                        Plant List
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <Link to={`/plants`}>
                    <button type="button" className="cancel__btn secondary">
                      Cancel
                    </button>
                  </Link>
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="submit-new__btn secondary"
                  >
                    Submit
                  </button>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}
