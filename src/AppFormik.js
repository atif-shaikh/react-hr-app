import { Form, Formik, useField } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Styles } from './styles/Styles';

const CustomTextInput = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error
        ?(
          <div className="error">{meta.error}</div>
        )
        : null
      }
    </>
  )
}

const CustomCheckbox = ({children, ...props}) => {
  const [field, meta] = useField(props, 'checkbox');
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error
        ?(
          <div className="error">{meta.error}</div>
        )
        : null
      }
    </>
  )
}

const CustomSelect = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error
        ?(
          <div className="error">{meta.error}</div>
        )
        : null
      }
    </>
  )
}

function App() {
  return (
    <Styles>
      <Formik
        initialValues = {{
          name: '',
          email: '',
          acceptedTerms: '',
          specialPower: ''
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "Must be atleast 3 characters.")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid Email Address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the tersm and condiitons'),
          specialPower: Yup.string()
            .oneOf(['flight', 'invisibility', 'wealthy bat guy', 'other'], 'Invalid Special Power')
            .required(),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          },3000)
        }}
      >
        {props => (
          <Form>
            <h1>Sign Up</h1>
            <CustomTextInput label="Name" name="name" type="text" placeholder="Frank" />
            <CustomTextInput label="Email" name="email" type="email" placeholder="frank@theTank.com" />
            <CustomSelect label="Special Power" name="specialPower" >
              <option value=""> Select a special power </option>
              <option value="flight"> Flight </option>
              <option value="invisibility"> Invisibility </option>
              <option value="wealthy bat guy"> Wealthy Bat Guy </option>
              <option value="other"> Other </option>
            </CustomSelect>
            <CustomCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </CustomCheckbox>
            <button type="submit">{ props.isSubmitting ? 'Loading...' : 'Submit'}</button>
            
          </Form>
        )}
      </Formik>
    </Styles>

  );
}

export default App;
