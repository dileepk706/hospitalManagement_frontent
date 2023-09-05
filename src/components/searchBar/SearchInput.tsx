import React,{useState,ChangeEvent} from 'react'

type SearchInputProps ={
  handleSearch: (searchQ?: string) => Promise<void>
}

const SearchInput:React.FC<SearchInputProps>=({handleSearch})=> {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value)
  };

  return (
    <div className="flex items-center space-x-2 border border-black rounded-xl ">
      
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-1 w-40 focus:outline-none focus:border-blue-500"
      />
      
    </div>
  )
}

export default SearchInput
