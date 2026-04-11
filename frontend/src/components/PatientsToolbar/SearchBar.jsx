import { Search } from 'lucide-react'

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
    <input
      type="text"
      value={searchTerm}
      placeholder="Поиск по ФИО..."
      className="pl-10 pr-4 py-2 w-full md:w-80 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
)

export default SearchBar
