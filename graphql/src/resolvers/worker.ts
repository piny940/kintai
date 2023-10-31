import { HOST } from '../resources/constants'

export const getMe = async () => {
  const response = await fetch(`${HOST}/workers/me`, {
    credentials: 'include',
  })
  const json = (await response.json()) as any
  return json.worker
}
