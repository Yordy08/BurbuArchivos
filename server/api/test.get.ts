import { defineEventHandler } from 'h3'

export default defineEventHandler(() => ({ ok: true, message: "Test endpoint works" }))
