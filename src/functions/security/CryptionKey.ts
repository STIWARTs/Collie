const UserProfileEncryptionKey = (
  UserId: string,
  type: UserProfileEncryptionKeyType,
) => {
  if (type === 'FullName') {
    return ('user_profile-' + `${UserId}` + '-fullname') as string;
  }
  if (type === 'EmailAddress') {
    return ('user_profile-' + `${UserId}` + '-emailaddress') as string;
  }
  if (type === 'PhoneNumber') {
    return ('user_profile-' + `${UserId}` + '-phonenumber') as string;
  }
  if (type === 'PhotoURL') {
    return ('user_profile-' + `${UserId}` + '-photourl') as string;
  }
  if (type === 'DateOfBirth') {
    return ('user_profile-' + `${UserId}` + '-dateofbirth') as string;
  }
  if (type === 'Age') {
    return ('user_profile-' + `${UserId}` + '-age') as string;
  }
  if (type === 'Gender') {
    return ('user_profile-' + `${UserId}` + '-gender') as string;
  } else return undefined;
};

export default UserProfileEncryptionKey;
