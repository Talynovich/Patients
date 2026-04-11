import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { schemaPatients } from '../../shared/lib/validation/patient.schema'
import { useSavePatientMutation } from '../../store/patients/patientsApi'

const ModalForm = ({ isOpen, onClose, initialDate }) => {
  const [savePatient] = useSavePatientMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaPatients),
    defaultValues: {
      name: '',
      dob: '',
      gender: 'Мужской',
      phone: '+996',
      diagnosis: '',
      medicalHistory: '',
    },
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  useEffect(() => {
    if (initialDate) {
      reset({
        name: initialDate.name || '',
        dob: initialDate.dob.slice(0, 10) || '',
        gender: initialDate.gender || 'Мужской',
        phone: initialDate.phone || '+996',
        diagnosis: initialDate.diagnosis || '',
        medicalHistory: initialDate.medicalHistory || '',
      })
    } else {
      reset({
        name: '',
        dob: '',
        gender: 'Мужской',
        phone: '+996',
        diagnosis: '',
        medicalHistory: '',
      })
    }
  }, [initialDate, reset])

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        id: initialDate?.id,
      }

      console.log('Перед сохранением:', payload)

      await savePatient(payload).unwrap()
      reset()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Новый пациент
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ФИО пациента
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Иванов Иван Иванович"
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Дата рождения
              </label>
              <input
                required
                type="date"
                className="w-full h-10 px-3 border border-slate-300 rounded-lg
             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                {...register('dob')}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Телефон
              </label>
              <input
                required
                type="tel"
                maxLength={13}
                className="w-full h-10 px-3 border border-slate-300 rounded-lg
             focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Пол
            </label>
            <select
              className="w-full px-3 py-2 border border-slate-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
              {...register('gender')}
            >
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Диагноз
            </label>
            <input
              type="text"
              placeholder="Основной диагноз"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              {...register('diagnosis')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              История болезни
            </label>
            <textarea
              rows={4}
              placeholder="Опишите историю болезни пациента..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              {...register('medicalHistory')}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-600
                 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Отмена
            </button>
            <button
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-600
                 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalForm
