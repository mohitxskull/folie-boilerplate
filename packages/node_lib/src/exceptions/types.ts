export type ValidationError = {
  message: string
  field: string
  rule: string
  index?: number
  meta?: Record<string, any>
}
