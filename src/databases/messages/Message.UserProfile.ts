export const DBCreateMessage: ISuccess = {
  name: 'Success',
  message: 'database has been created',
};

export const DBUpdateMessage: ISuccess = {
  name: 'Success',
  message: 'database has been updated',
};

export const DBDeleteMessage: ISuccess = {
  name: 'Success',
  message: 'database has been deleted',
};

export const DBErrorMessage: IError = {
  name: 'Internal Server Error',
  message: 'Error in the Connection',
};

export const DataNullMessage: IError = {
  name: 'Server Error',
  message: 'Data not found or exist',
};

export const ServerErrorMessage: IServerError = {
  status: 500,
  statusText: 'Internal Server Error',
};
