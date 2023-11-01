import { serialize } from 'object-to-formdata'
import { HOST } from '../resources/constants'
import { jsonToWorker } from './worker'

export const login = async (_, args: { email: string; password: string }) => {
  const response = await fetch(`${HOST}/session`, {
    method: 'POST',
    body: serialize({ email: args.email, password: args.password }),
    credentials: 'include',
  })
  const json = (await response.json()) as any
  return jsonToWorker(json.worker)
}

export const logout = async () => {
  const response = await fetch(`${HOST}/session`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (response.ok) {
    return true
  } else {
    return false
  }
}
