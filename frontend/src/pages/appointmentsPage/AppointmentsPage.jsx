import React, { useState } from 'react'

import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
  message,
} from 'antd'
import dayjs from 'dayjs'

import { appointmentSchema } from '../../shared/lib/validation/appointment.scheema.js'
import {
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
  useUpdateAppointmentMutation,
} from '../../store/appointments/appointmentsApi.js'
import { useGetPatientsQuery } from '../../store/patients/patientsApi.js'

const { Title } = Typography

const AppointmentsPage = () => {
  const { data: appointmentsData = [], isLoading } = useGetAppointmentsQuery()
  const [createAppointment] = useCreateAppointmentMutation()
  const [deleteAppointment] = useDeleteAppointmentMutation()
  const [updateAppointment] = useUpdateAppointmentMutation()
  const [editingId, setEditingId] = useState(null)
  const {
    data: patientsData = { data: [], total: 0 },
    isLoading: isPatientsLoading,
  } = useGetPatientsQuery()

  const [form] = Form.useForm()

  const yupSync = {
    async validator({ field }, value) {
      await appointmentSchema.validateAt(field, { [field]: value })
    },
  }

  const onFinish = async (values) => {
    const payload = {
      appointmentDate: values.appointmentDate.toISOString(),
      reason: values.reason,
      patient: values.patient,
    }

    try {
      if (editingId) {
        await updateAppointment({
          _id: editingId._id,
          ...payload,
        })
        message.success('Запись успешно обновлена')
      } else {
        await createAppointment(payload)
        message.success('Запись успешно создана')
      }

      form.resetFields()
      setEditingId(null)
    } catch (error) {
      console.error(`Ошибка при сохранении: ${error}`)
      message.error('Произошла ошибка при сохранении данных')
    }
  }
  const onDelete = async (data) => {
    await deleteAppointment(data)
  }

  const onUpdate = async (data) => {
    try {
      setEditingId(data)
      form.setFieldsValue({
        patient: data.patient._id,
        appointmentDate: dayjs(data.appointmentDate),
        reason: data.reason,
      })
    } catch (error) {
      console.log(`Error update appointment: ${error}`)
    }
  }
  const columns = [
    {
      title: 'Пациент',
      dataIndex: 'patient',
      key: 'patient',
      render: (patient) => (
        <span className="text-blue-600 font-medium">{patient.name}</span>
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
          {!editingId && (
            <>
              <Button type="link" size="small" onClick={() => onUpdate(record)}>
                Редактировать
              </Button>
              <Popconfirm
                title="Удалить запись"
                description="Вы уверены, что хотите удалить эту запись?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => onDelete(record._id)}
              >
                <Button danger size="small" type="link">
                  Отменить
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ]

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
              <Form.Item name="patient" label="Пациент" rules={[yupSync]}>
                <Select placeholder="Выберите из списка" size="large">
                  {patientsData.data.map((patient) => (
                    <Select.Option keyr={patient._id} value={patient._id}>
                      {patient.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="appointmentDate"
                label="Дата и время"
                rules={[yupSync]}
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
                rules={[yupSync]}
              >
                <Input placeholder="Напр: Первичный осмотр" size="large" />
              </Form.Item>
            </div>

            <div className="flex justify-end mt-2">
              {editingId ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Сохранить изменения
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500"
                >
                  Записать пациента
                </Button>
              )}

              {editingId && (
                <Button
                  onClick={() => {
                    setEditingId(null)
                    form.resetFields()
                  }}
                  style={{ marginLeft: 8 }}
                >
                  Отмена
                </Button>
              )}
            </div>
          </Form>
        </Card>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-50 flex justify-between items-center">
            <span className="font-semibold text-gray-700">Реестр записей</span>
          </div>
          <Table
            columns={columns}
            dataSource={appointmentsData}
            pagination={{ pageSize: 10 }}
            className="custom-table"
            scroll={{ x: 'max-content' }}
            rowKey="_id"
          />
        </div>
      </div>
    </div>
  )
}

export default AppointmentsPage
