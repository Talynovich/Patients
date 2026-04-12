import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Table, message } from 'antd'

import PatientsToolbar from '../../components/PatientsToolbar/PatientsToolbar'
import {
  useDeletePatientMutation,
  useGetPatientsQuery,
  useSavePatientMutation,
} from '../../store/patients/patientsApi'
import { setCurrentPatient } from '../../store/patients/patientsSlice'
import { usePatientColumns } from './usePatientColumns'

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)

  const dispatch = useDispatch()


  const { data = [], isLoading } = useGetPatientsQuery()
  console.log(data)
  const [deletePatient] = useDeletePatientMutation()
  const [savePatient] = useSavePatientMutation()

  const filteredPatients = data.filter((p) =>
    p?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const handleEditingClick = (patient) => {
    savePatient(patient)
    setIsModalOpen(true)
    setEditingPatient(patient)
  }

  const handleCloseModal = () => {
    setEditingPatient(null)
    setIsModalOpen(false)
    dispatch(setCurrentPatient(null))
  }

  const [_, holder] = message.useMessage()

  const onDelete = (id) => {
    deletePatient(id)
  }

  const columns = usePatientColumns({
    onDelete,
    onEdit: handleEditingClick,
    holder,
  })

  return (
    <div className="bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <PatientsToolbar
          filteredPatients={filteredPatients}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          initialDate={editingPatient}
          handleCloseModal={handleCloseModal}
        />
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <Table
            columns={columns}
            dataSource={data}
            loading={isLoading}
            rowKey="id"
            scroll={{ x: 'max-content' }}
          />
        </div>
      </div>
    </div>
  )
}

export default PatientManagement
