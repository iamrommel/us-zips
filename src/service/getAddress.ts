import fs from 'fs'
import * as Papa from 'papaparse'
import path from 'path'

export interface Address {
  zip: string
  lat: number
  lng: number
  city: string
  state_id: string
  state_name: string
  county_name?: string
  timezone?: string
}

let cachedData: Address[] | null = null
const csvFilePath = path.resolve(__dirname, '../data/us-zips.csv')

/**
 * Reads and parses the CSV file, caching the result for subsequent calls
 */
export async function getAddress(): Promise<Address[]> {
  // If we already have the data, return it immediately
  if (cachedData) {
    return cachedData
  }

  const fileContent = fs.readFileSync(csvFilePath, 'utf-8')
  return new Promise((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,
      dynamicTyping: false,
      complete: (results) => {
        const data = results.data as Address[]
        if (!data) {
          throw new Error('Failed to parse CSV file')
        }

        //we need to map only the required fields
        cachedData = data.map((m) => {
          return {
            zip: m.zip,
            lat: m.lat,
            lng: m.lng,
            city: m.city,
            state_id: m.state_id,
            state_name: m.state_name,
            county_name: m.county_name,
            timezone: m.timezone,
          }
        })

        resolve(cachedData)
      },
      error(error: Error) {
        reject(error)
      },
    })
  })
}

export async function getAddressByZip(zip: string) {
  if (!zip) {
    throw new Error('Zip code is required')
  }

  const data = await getAddress()
  const result = data.find((row) => row.zip === zip)

  if (!result) {
    throw new Error('Zip code not found')
  }

  return result
}

export async function getZipsByState(stateId: string) {
  if (!stateId) {
    throw new Error('State name is required')
  }

  const data = await getAddress()
  const result = data.filter((row) => {
    return row?.state_id?.toLowerCase?.() === stateId?.toLowerCase()
  })

  if (result.length === 0) {
    throw new Error('State not found')
  }

  return result
}
