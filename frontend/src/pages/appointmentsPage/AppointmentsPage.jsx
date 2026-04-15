import React from 'react'

import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'
import dayjs from 'dayjs'

import { useGetAppointmentsQuery } from '../../store/appointments/appointmentsApi.js'

const { Title } = Typography

const AppointmentsPage = () => {
  const { data = [], isLoading } = useGetAppointmentsQuery()
  const [form] = Form.useForm()

  const columns = [
    {
      title: 'Пациент',
      dataIndex: 'patient',
      key: 'patient',
      render: (text) => (
        <span className="text-blue-600 font-medium">{text}</span>
      ),
    },
    {
      title: 'Дата и время',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      render: (date) => dayjs(date).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Причина',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,
    },
    {
      title: 'Действия',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" size="small">
            Редактировать
          </Button>
          <Button type="link" danger size="small">
            Отменить
          </Button>
        </Space>
      ),
    },
  ]

  const onFinish = (values) => {
    const payload = {
      appointmentDate: values.date.toISOString(),
      status: 'Scheduled',
      reason: values.reason,
      patientId: values.patientId,
    }
    form.resetFields()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Title level={2} style={{ margin: 0 }}>
            Запись на приём
          </Title>
        </div>

        <Card className="shadow-sm border-gray-100">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ status: 'Scheduled' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item
                name="patient"
                label="Пациент"
                rules={[{ required: true, message: 'Выберите пациента' }]}
              >
                <Select placeholder="Выберите из списка" size="large">
                  {data?.map((patient) => (
                    <Select.Option key={patient._id} value={patient.patient}>
                      {patient.patient}{' '}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="date"
                label="Дата и время"
                rules={[{ required: true, message: 'Выберите время' }]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm"
                  className="w-full"
                  size="large"
                  placeholder="Выберите дату и время"
                />
              </Form.Item>

              <Form.Item
                name="reason"
                label="Причина обращения"
                rules={[{ required: true, message: 'Укажите причину' }]}
              >
                <Input placeholder="Напр: Первичный осмотр" size="large" />
              </Form.Item>
            </div>

            <div className="flex justify-end mt-2">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="bg-blue-500"
              >
                Записать пациента
              </Button>
            </div>
          </Form>
        </Card>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <span className="font-semibold text-gray-700">Реестр записей</span>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            className="custom-table"
            scroll={{ x: 'max-content' }}
            rowKey={data.doctor}
          />
        </div>
      </div>
    </div>
  )
}

export default AppointmentsPage
