import { serialize } from 'object-to-formdata'
import { HOST } from '../resources/constants'
import { jsonToWorker } from './worker'
import { deleteData, postData } from '../utils/api'

export const login = async (_, args: { email: string; password: string }) => {
  const json = (
    await postData({
      url: '/session',
      data: { email: args.email, password: args.password },
    })
  )[1]
  return jsonToWorker(json.worker)
}

export const logout = async () => {
  const response = (await deleteData('/session'))[0]
  if (response.ok) {
    return true
  } else {
    return false
  }
}
