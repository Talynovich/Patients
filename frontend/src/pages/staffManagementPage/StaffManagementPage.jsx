import React, { useState } from 'react'

import { Button, Popconfirm, Space, Table, notification } from 'antd'
import { Plus } from 'lucide-react'

import ModalFormUsers from '../../components/ModalForm/ModalFormUsers.jsx'
import SearchBar from '../../components/PatientsToolbar'
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../../store/users/usersApi'

const StaffManagementPage = () => {
  const [api, holder] = notification.useNotification()
  const [searchTerm, setSearchTerm] = useState('')
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)
  const { data, isLoading, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()
  const filteredUsers = (data || []).filter((p) =>
    p?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEditingClick = (patient) => {
    setIsModalOpen(true)
    setEditingPatient(patient)
  }

  const handleCloseModal = () => {
    setEditingPatient(null)
    setIsModalOpen(false)
  }

  const onDelete = (id) => {
    deleteUser(id)
  }

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text, record) => (
        <a onClick={() => navigate(`/admin/users/${record._id}`)}>{text}</a>
      ),
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Действия',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" onClick={() => handleEditingClick(record)}>
            Редактировать
          </Button>
          <>
            {holder}
            <Popconfirm
              title="Удалить пользователя"
              description="Вы уверены, что хотите удалить этого сотрудника?"
              onConfirm={() => onDelete(record._id)}
              okText="Да"
              cancelText="Нет"
            >
              <Button danger type="link">
                Удалить
              </Button>
            </Popconfirm>
          </>
        </Space>
      ),
    },
  ]
  return (
    <div className="bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Реестр учётных записей
            </h1>
            <p className="text-slate-500">Всего записей: {data?.length}</p>
          </div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Button
            color="primary"
            variant="filled"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg transition-colors font-medium shadow-sm cursor-pointer"
          >
            <Plus size={17} />
            <span>Создать учётную запись</span>
          </Button>
          {IsModalOpen && (
            <ModalFormUsers
              isOpen={handleEditingClick}
              editingPatient={editingPatient}
              onClose={handleCloseModal}
            />
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <Table
            columns={columns}
            dataSource={filteredUsers}
            loading={isLoading}
            rowKey="_id"
            scroll={{ x: 'max-content' }}
          />
        </div>
      </div>
    </div>
  )
}

export default StaffManagementPage
