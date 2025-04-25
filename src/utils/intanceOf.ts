export function instanceOfErrorOverUserProfile(
  data: IError | IUserProfile,
): data is IError {
  return 'name' && 'message' in data;
}

export function instanceOfUserProfileOverError(
  data: IError | IUserProfile,
): data is IUserProfile {
  return '_data' && '_uid' in data;
}

export function instanceOfSuccessOverError(
  data: IError | ISuccess,
): data is ISuccess {
  return 'name' && 'message' in data;
}

export function instanceOfErrorOverSuccess(
  data: IError | ISuccess,
): data is IError {
  return 'name' && 'message' in data;
}
