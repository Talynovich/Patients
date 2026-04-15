import { Input, Space } from 'antd'
import { Search } from 'lucide-react'

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
    <Space.Compact style={{ width: '120%' }}>
      <Input
        placeholder="Поиск по имени..."
        defaultValue={searchTerm}
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Space.Compact>
  </div>
)

export default SearchBar
