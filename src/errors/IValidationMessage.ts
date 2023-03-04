export interface IValidationError {
  type: string
  field: string
  message: string
}

interface IValidationMessage<T> {
  isSuccess: boolean
  isFailure?: boolean
  errors?: IValidationError[]
  value?: T
}

export { IValidationMessage };
