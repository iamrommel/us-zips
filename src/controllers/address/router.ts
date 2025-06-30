import { Router } from 'express'
import { getAddressByZip, getZipsByState } from '../../service/getAddress'

export function setupAddressRoutes() {
  const router = Router()

  router.get('/zip/:zip', async (req, res) => {
    const { zip } = req.params
    const result = await getAddressByZip(zip)
    res.json(result)
  })

  router.get('/state/:stateId', async (req, res) => {
    const { stateId } = req.params
    const result = await getZipsByState(stateId)
    res.json(result)
  })

  return router
}
