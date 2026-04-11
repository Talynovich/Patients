import * as yup from 'yup'

export const schemaPatients = yup
  .object({
    name: yup
      .string()
      .required('Имя обязательно')
      .matches(
        /^[A-Za-zА-Яа-яЁё\s]+$/,
        'Имя не должно содержать цифры и спецсимволы'
      )
      .test('max-words', 'Имя не должно содержать больше трёх слов', (value) =>
        value ? value.trim().split(/\s+/).length <= 3 : true
      ),

    dob: yup
      .date()
      .required('Дата рождения обязательна')
      .max(new Date(), 'Дата рождения не может быть из будущего'),

    phone: yup
      .string()
      .required('Телефон обязателен')
      .matches(/^\+?\d+$/, 'Телефон должен содержать только цифры')
      .max(13, 'Максимальная длина номера — 13 цифр')
      .length(13, 'Номер телефона должен 13 цифр'),

    diagnosis: yup.string().required('Диагноз обязателен'),

    medicalHistory: yup.string().nullable(),
  })
  .required()
