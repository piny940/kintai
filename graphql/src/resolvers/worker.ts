import { HOST } from '../resources/constants'

export const getMe = async () => {
  const response = await fetch(`${HOST}/workers/me`, {
    credentials: 'include',
  })
  const json = (await response.json()) as any
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
