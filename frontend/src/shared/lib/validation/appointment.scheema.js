import * as Yup from 'yup'

export const appointmentSchema = Yup.object().shape({
  patient: Yup.string().required('Выберите пациента'),

  appointmentDate: Yup.date().required('Дата обязательна'),

  reason: Yup.string()
    .required('Укажите причину обращения')
    .min(3, 'Слишком короткое описание')
    .max(500, 'Описание слишком длинное')
    .matches(
      /^[a-zA-Zа-яА-Я0-9\s.,?!-]+$/,
      'Причина не должна содержать спецсимволы (например, {}, *, #, №)'
    ),
})
