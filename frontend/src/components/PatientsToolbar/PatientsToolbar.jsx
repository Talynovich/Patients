import React from 'react'

import { Button } from 'antd'
import { Plus } from 'lucide-react'

import ModalForm from '../ModalForm/index.js'
import SearchBar from './SearchBar'

const PatientsToolbar = ({
  filteredPatients,
  searchTerm,
  setSearchTerm,
  isModalOpen,
  setIsModalOpen,
  initialDate,
  handleCloseModal,
}) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Реестр пациентов</h1>
        <p className="text-slate-500">
          Всего записей: {filteredPatients?.length}
        </p>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Button
        color="primary"
        variant="filled"
        onClick={() => setIsModalOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-lg transition-colors font-medium shadow-sm cursor-pointer"
      >
        <Plus size={17} />
        <span>Добавить пациента</span>
      </Button>
      <ModalForm
        isOpen={isModalOpen}
        initialDate={initialDate}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default PatientsToolbar
