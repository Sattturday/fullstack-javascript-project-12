import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const Login = () => {
  return (
    <div>
      <h1>Страница авторизации</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          console.log('Форма отправлена:', values)
        }}
      >
        <Form>
          <div>
            <label htmlFor="username">Имя пользователя</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Войти</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Login
