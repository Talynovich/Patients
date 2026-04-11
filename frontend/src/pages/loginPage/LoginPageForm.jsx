import React from 'react'
import { useDispatch } from 'react-redux'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, notification } from 'antd'

import { useLoginMutation } from '../../store/auth/authApi.js'
import { setCredentials } from '../../store/auth/authSlice.js'

const LoginPageForm = () => {
  const dispatch = useDispatch()
  const [login] = useLoginMutation()

  const onFinish = async (values) => {
    try {
      const res = await login(values).unwrap()
      dispatch(setCredentials(res))
    } catch {
      notification.error({ title: 'Неверный логин или пароль' })
    }
  }

  return (
    <Form
      name="email"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ email: 'user@med.ru', password: 'user123' }}
    >
      <Form.Item
        label="Логин"
        name="email"
        rules={[{ required: true, message: 'Введите логин' }]}
      >
        <Input
          size="large"
          prefix={<UserOutlined />}
          placeholder="Введите логин"
        />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          { required: true, message: 'Введите пароль' },
          { min: 5, message: 'Пароль должен быть не менее 5 символов' },
        ]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Введите пароль"
        />
      </Form.Item>

      <Form.Item className="mb-2">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full"
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginPageForm
