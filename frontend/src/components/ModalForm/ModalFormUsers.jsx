import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from '../../store/users/usersApi.js'

const ModalForm = ({ isOpen, onClose, editingPatient }) => {
  const [createUser] = useCreateUserMutation()
  const [updatePatient] = useUpdateUserMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (editingPatient) {
      reset({
        fullName: editingPatient.fullName || '',
        email: editingPatient.email || '',
        password: '',
      })
    } else {
      reset({
        fullName: '',
        email: '',
        password: '',
      })
    }
  }, [editingPatient, reset])

  const onSubmit = async (formData) => {
    try {
      if (editingPatient?._id) {
        const updateData = {
          id: editingPatient._id,
          ...formData,
        }
        if (!updateData.password) {
          delete updateData.password
        }
        await updatePatient(updateData).unwrap()
      } else {
        await createUser(formData).unwrap()
      }
      reset()
      onClose()
    } catch (error) {
      console.error(error)
    }
  }
  const handleClose = () => {
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed max-h-full  inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-y-auto">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          {editingPatient ? (
            <h2 className="text-xl font-semibold text-slate-800">
              Редактирование учётной записи
            </h2>
          ) : (
            <h2 className="text-xl font-semibold text-slate-800">
              Новый доктор
            </h2>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ФИО доктора
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Иванов Иван Иванович"
              {...register('fullName', {
                required: 'ФИО обязательно для заполнения',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Разрешена только латиница',
                },
              })}
            />
            {errors.fullName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="users@med.ru"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              {...register('email', { required: 'Укажите email' })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              {...register('password', {
                required: 'Пароль обязателен',
                minLength: {
                  value: 5,
                  message: 'Пароль должен содержать минимум 5 символов',
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
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
              type="submit"
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
