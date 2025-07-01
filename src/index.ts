import express, { ErrorRequestHandler, NextFunction } from 'express'
import cors from 'cors'
import { setupAddressRoutes } from './controllers/address/router'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      'All ZIP code, city, and state data used in this project is sourced from the SimpleMaps US ZIP Code Database (Free Version) https://simplemaps.com/data/us-zips'
    )
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/address/', setupAddressRoutes())

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

// Global error handler (must be last)
const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.error(err.stack)
  res.status(200).json({
    message: err.message,
    code: err.code,
  })
}

app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.debug(`Server is running on http://localhost:${PORT}`)
})

export default app
