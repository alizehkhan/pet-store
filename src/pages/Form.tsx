import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../components/Input'

const Form = () => {
  const [errorBannerMessage, setErrorBannerMessage] = useState<
    string | undefined
  >()

  const formRef = useRef(null)

  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<EventTarget>) => {
    event.preventDefault()
    const formData = new FormData(formRef.current ?? undefined)

    try {
      const response = await fetch('https://petstore.swagger.io/v2/pet', {
        method: 'POST',
        body: JSON.stringify({
          ...Object.fromEntries(formData),
          photoUrls: [formData.get('photoUrls')],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response?.ok) {
        navigate('/')
      } else {
        setErrorBannerMessage('⚠️ Something went wrong. Please try again')
      }
    } catch (error: any) {
      if (
        error.message === 'Timeout' ||
        error.message === 'Network request failed'
      ) {
        setErrorBannerMessage('⚠️ Please check your internet connection.')
      } else {
        setErrorBannerMessage('⚠️ Something went wrong. Please try again')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="max-w-sm">
      <Input required id="name">
        Name
      </Input>
      <Input required id="photoUrls" type="url" placeholder="https://">
        Photo URL
      </Input>

      <fieldset className="mt-4 flex flex-col">
        <legend className="text-lg font-bold">
          Purchasing status of your pet:
        </legend>
        <div>
          <input type="radio" id="available" name="status" value="available" />
          <label className="ml-2 text-xl" htmlFor="available">
            Available
          </label>
        </div>

        <div>
          <input type="radio" id="pending" name="status" value="pending" />
          <label className="ml-2 text-xl" htmlFor="pending">
            Pending
          </label>
        </div>

        <div>
          <input type="radio" id="sold" name="status" value="sold" />
          <label className="ml-2 text-xl" htmlFor="sold">
            Sold
          </label>
        </div>
      </fieldset>

      <button
        className="mt-8 rounded-md bg-orange-800 px-6 py-3 text-xl text-white shadow-sm transition-all hover:scale-105 hover:shadow-md"
        type="submit"
      >
        Add pet
      </button>
      {errorBannerMessage && (
        <p className="text-red-800">{errorBannerMessage}</p>
      )}
    </form>
  )
}

export default Form
