import { getData } from '../utils/api'

export const getMe = async () => {
  const json = (await getData('/workers/me'))[1]
  return jsonToWorker(json.worker)
}

export const jsonToWorker = (json: any) => {
  if (json == null) {
    return null
  }
  return {
    ...json,
    status: statusMap[json.status],
  }
}

const statusMap = {
  0: 'ACTIVE',
  1: 'INACTIVE',
}
