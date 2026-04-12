import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { Card, Typography } from 'antd'

import { useGetUserQuery } from '../../store/auth/authApi'
import LoginPageForm from './LoginPageForm.jsx'

const { Title, Text } = Typography

const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { isLoading } = useGetUserQuery()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  if (isLoading || isAuthenticated) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <Title level={3} className="!mb-1">
            Медицинский портал
          </Title>
          <Text type="secondary">Вход в систему</Text>
        </div>
        <LoginPageForm />
      </Card>
    </div>
  )
}

export default LoginPage
