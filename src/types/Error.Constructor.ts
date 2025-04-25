export function CatchError(error: IError) {
  return {
    name: 'Something went wrong',
    message: error.message,
  };
}

export class IError extends Error {
  constructor(error: IError) {
    super(error.message);
    this.name = 'Something went wrong';
  }
}
