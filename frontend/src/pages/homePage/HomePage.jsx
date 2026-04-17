import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import {
  ArrowRightOutlined,
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'

const { Title, Text } = Typography

const HomePage = () => {
  const navigate = useNavigate()

  const menuItems = [
    {
      title: 'Реестр пациентов',
      description:
        'Управление базой данных пациентов, просмотр и редактирование карт.',
      icon: <UserOutlined className="text-3xl text-blue-500" />,
      path: '/patients',
      color: 'hover:border-blue-400',
    },
    {
      title: 'Запись на прием',
      description: 'Создание новых записей',
      icon: <CalendarOutlined className="text-3xl text-green-500" />,
      path: '/appointments',
      color: 'hover:border-green-400',
    },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-10 text-center">
        <Title level={2}>Панель управления</Title>
      </header>

      <Row gutter={[24, 24]}>
        {menuItems.map((item, index) => (
          <Col xs={24} md={12} key={index}>
            <Card
              hoverable
              className={`h-full transition-all duration-300 border-2 border-transparent ${item.color}`}
              onClick={() => navigate(item.path)}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-50 rounded-lg">{item.icon}</div>
                <div className="flex-1">
                  <Title level={4} style={{ marginTop: 0 }}>
                    {item.title}
                  </Title>
                  <Text type="secondary" className="block mb-4">
                    {item.description}
                  </Text>
                  <div className="flex items-center text-blue-500 font-medium">
                    Перейти <ArrowRightOutlined className="ml-2 text-xs" />
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomePage
