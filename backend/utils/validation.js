// Validation helper functions for backend

function isNonEmptyString(value, minLength = 1, maxLength = 500) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  return trimmed.length >= minLength && trimmed.length <= maxLength
}

function isValidDateString(dateStr) {
  if (typeof dateStr !== 'string') return false
  // Check YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateStr)) return false
  const date = new Date(dateStr)
  return !isNaN(date.getTime())
}

function isValidNumberInRange(value, min, max) {
  const num = Number(value)
  if (isNaN(num)) return false
  return num >= min && num <= max
}

function sanitizeString(str) {
  if (typeof str !== 'string') return ''
  // Remove potentially dangerous characters but keep basic punctuation
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/\s+/g, ' ') // Normalize whitespace
}

module.exports = {
  isNonEmptyString,
  isValidDateString,
  isValidNumberInRange,
  sanitizeString
}

