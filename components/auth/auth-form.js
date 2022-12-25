import { useFormik } from 'formik'
import { useState } from 'react'

import { signIn } from 'next-auth/react'
import * as Yup from 'yup'

import Button from '../button/Button'
import classes from './auth-form.module.css'

const createUser = async (user) => {
  console.log(user)
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  return data
}

const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState(null)
  const formik = useFormik({
    initialValues: {
      name: '',
      pass: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(8).max(15).required('This field is required'),
      password: Yup.string().min(8).max(20).required('This field is required'),
    }),
    onSubmit: async function (values, { setSubmitting }) {
      const { name, password } = values

      if (isLogin) {
        const res = await signIn('credentials', {
          redirect: false,
          name,
          password,
          // callbackUrl: `${window.location.origin}/`
        })
        if (res?.error) {
          setError(res.error)
        }
      } else {
        try {
          const result = await createUser({ name, password })
          console.log(result)
        } catch (error) {
          console.log(error)
        }
      }
      setSubmitting(false)
    },
  })

  return (
    <>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <div className={classes['form-container']}>
          <h2 className={classes.title}>{isLogin ? 'Sign in' : 'Sign up'}</h2>
          {error && <div>{error}</div>}

          <div className={classes['form-group']}>
            <label htmlFor="name">Name</label>
            <input
              className={classes['form-control']}
              id="name"
              type="text"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className={classes['error-message']}>
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div className={classes['form-group']}>
            <label htmlFor="password">Password</label>
            <input
              className={classes['form-control']}
              id="password"
              type="text"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={classes['error-message']}>
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <Button
            type="submit"
            className={classes['submit-btn']}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Please wait' : 'Submit'}
          </Button>
          <a
            className={classes.link}
            onClick={() => {
              setIsLogin(!isLogin)
            }}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </a>
        </div>
      </form>
    </>
  )
}

export default AuthForm
