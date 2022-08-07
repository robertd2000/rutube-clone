import axios from 'axios'

import { getContentType } from '@/utils/api.utils'

export const API = `${process.env.APP_URL}/api`

export const axiosClassic = axios.create({
	baseURL: API,
	headers: getContentType()
})
