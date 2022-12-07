import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./textError";
import { Link } from "react-router-dom";

export default function NewPlant() {
  const onSubmit = async (values, actions) => {
    alert(JSON.stringify(values, null, 2));

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPlant = { ...values };

    const response = fetch(
      "https://plant-babies-server.cyclic.app/plants/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlant),
      }
    ).catch((error) => {
      window.alert(error);
      return;
    });
    if (response) {
      actions.setSubmitting(false);
      actions.resetForm();

      actions.setStatus("sent");

      console.log("your plant baby has been updated:)");
    }
  };

  const initialValues = {
    name: "",
    botanicalName: "",
    img: "https://i.postimg.cc/63fzjKf6/placeholder-plant-225w.jpg",
    waterFrequency: "",
    feedFrequency: "",
    light: "",
    care: "",
    waterDate: "",
    feedDate: "",
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
      <h2>Add Your Plant</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              <label htmlFor="name">Name:</label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Spider Plant"
              />
              <ErrorMessage name="name" component={TextError} />

              <label htmlFor="botanicalName">Botanical Name:</label>
              <Field
                id="botanicalName"
                name="botanicalName"
                type="text"
                placeholder="Chlorophytum comosum"
              />
              <ErrorMessage name="botanicalName" component={TextError} />

              <label htmlFor="img">
                Image url{" "}
                <span className="label-span">
                  (or leave blank for default image)
                </span>
                :
              </label>
              <Field
                id="img"
                name="img"
                type="url"
                placeholder="https://images.unsplash.com/photo-1581573025746-0ee51aef032a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80"
              />
              <ErrorMessage name="img" component={TextError} />

              <label htmlFor="waterFrequency">Water Frequency (in days):</label>
              <Field
                id="waterFrequency"
                name="waterFrequency"
                type="number"
                placeholder="7"
              />
              <ErrorMessage name="waterFrequency" component={TextError} />

              <label htmlFor="feedFrequency">Feed Frequency (in days):</label>
              <Field
                id="feedFrequency"
                name="feedFrequency"
                type="number"
                placeholder="30"
              />
              <ErrorMessage name="feedFrequency" component={TextError} />

              <label htmlFor="light">Light:</label>
              <Field
                id="light"
                name="light"
                type="text"
                placeholder="Partial, shade"
              />
              <ErrorMessage name="light" component={TextError} />

              <label htmlFor="care">Care:</label>
              <Field
                as="textarea"
                id="care"
                name="care"
                type="text"
                placeholder="Spider plants are often grown in containers as hanging plants due to the cascading nature of their foliage and their long stems with plantlets. 
          Regular watering is typically the most time-consuming part of spider plant care. Throughout the growing season (spring to fall) also plan to fertilize regularly. And repot your plant as needed once its roots have outgrown the container. "
              />
              <ErrorMessage name="care" component={TextError} />

              <label htmlFor="waterDate">Next Water Date:</label>
              <Field
                id="waterDate"
                name="waterDate"
                type="date"
                placeholder="11/06/2022"
              />
              <ErrorMessage name="waterDate" component={TextError} />

              <label htmlFor="feedDate">Next Feed Date:</label>
              <Field
                id="feedDate"
                name="feedDate"
                type="date"
                placeholder="11/01/2022"
              />
              <ErrorMessage name="feedDate" component={TextError} />

              {formik.status === "sent" ? (
                <div className="success-msg">
                  <h3>Congrats on your new Plant Baby!</h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      /*prevent default submit behaviour which was causing validation errors even though I have type button*/
                      e.preventDefault();
                      formik.setStatus("");
                    }}
                    className="create-new__btn secondary"
                  >
                    Add Another
                  </button>
                  <Link to={`/plants`}>
                    <button type="button" className="cancel__btn secondary">
                      Back to List
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to={`/plants`}>
                    <button type="button" className="cancel__btn secondary">
                      Cancel
                    </button>
                  </Link>
                  <button type="submit" className="submit-new__btn secondary">
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
