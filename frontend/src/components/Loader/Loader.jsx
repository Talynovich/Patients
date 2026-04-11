import React from 'react'

const Loader = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans animate-pulse">
      {/* Кнопка "Назад" (заглушка) */}
      <div className="flex items-center mb-6 w-32 h-6 bg-slate-200 rounded-lg"></div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Шапка карточки */}
        <div className="bg-slate-200 p-6">
          <div className="h-8 w-1/2 bg-slate-300 rounded-md mb-2"></div>
          <div className="h-4 w-1/4 bg-slate-300 rounded-md opacity-70"></div>
        </div>

        {/* Основной контент */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Левая колонка: Личные данные */}
          <div className="space-y-6">
            <div className="h-4 w-24 bg-slate-200 rounded"></div>{' '}
            {/* Заголовок секции */}
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-slate-200 rounded-full"></div>{' '}
                  {/* Иконка */}
                  <div className="h-5 w-3/4 bg-slate-100 rounded"></div>{' '}
                  {/* Текст */}
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка: Медицинская информация */}
          <div className="space-y-6 border-l border-slate-100 pl-0 md:pl-8">
            <div className="h-4 w-40 bg-slate-200 rounded"></div>{' '}
            {/* Заголовок секции */}
            {/* Блок с диагнозом */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="h-5 w-24 bg-slate-200 rounded mb-3"></div>
              <div className="h-6 w-full bg-slate-200 rounded"></div>
            </div>
            {/* Текст истории болезни */}
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-100 rounded"></div>
              <div className="h-3 w-full bg-slate-100 rounded"></div>
              <div className="h-3 w-2/3 bg-slate-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
