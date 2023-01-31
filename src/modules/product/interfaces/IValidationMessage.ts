export interface IValidationError {
  type: string
  field: string
  message: string
}

interface IValidationMessage<T> {
  isSuccess: boolean
  error?: IValidationError
  value?: T
}

export { IValidationMessage }
