import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import useNavigateSearch from '../utils/useNavigateSearch'
import { IconPlus } from '@tabler/icons-react'

const statuses = ['available', 'pending', 'sold'] as const
type Status = (typeof statuses)[number]

function checkStatus(input: string | null): input is Status {
  return !input && statuses.includes(input as Status)
}

interface Pet {
  id: 0
  category: {
    id: number
    name: string
  }
  name: string
  photoUrls: string[]
  tags: [
    {
      id: number
      name: string
    },
  ]
  status: string
}

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pets, setPets] = useState<Pet[]>([])

  const navigateSearch = useNavigateSearch()
  const [searchParams] = useSearchParams()

  const statusFromUrl = searchParams.get('status')

  const [selectedStatus, setSelectedStatus] = useState<Status>(
    checkStatus(statusFromUrl) ? statusFromUrl : 'available',
  )

  useEffect(() => {
    const url = `https://petstore.swagger.io/v2/pet/findByStatus?status=${selectedStatus}`
    setIsLoading(true)
    fetch(url, { headers: { accept: 'application/json' } })
      .then((response) => response.json())
      .then((data) => {
        setPets(data)
        navigateSearch('/', { status: selectedStatus })
        setIsLoading(false)
      })
  }, [selectedStatus])

  return (
    <>
      <div className="flex justify-between">
        <nav>
          <ul className="my-4 flex flex-wrap items-center gap-3">
            {statuses.map((status, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelectedStatus(status)}
                  className={`inline-block rounded-full px-3 py-1 text-lg shadow-sm transition-all ${
                    selectedStatus === status
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-200 text-gray-700 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  {status}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/new" className="group flex items-center gap-3 text-lg">
          <div className="rounded-full bg-orange-800 p-4 text-white shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md">
            <IconPlus />
          </div>
          Add pet
        </Link>
      </div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        pets.map((pet, i) => (
          <ul key={i} className="my-8">
            <li>
              <Link to={`/${pet.id}`} className="text-left">
                <p>{pet.status}</p>
                <h2 className="text-lg font-bold">{pet.name}</h2>
              </Link>
            </li>
          </ul>
        ))
      )}
    </>
  )
}

export default Home
