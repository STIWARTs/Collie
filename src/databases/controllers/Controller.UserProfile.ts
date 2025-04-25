import { IError } from 'types/Error.Constructor';
import {
  DELETE_USER_PROFILE,
  CREATE_USER_PROFILE,
  UPDATE_USER_PROFILE,
} from '../functions/Function.UserProfile';
import { revalidateTag } from 'next/cache';
import { TagForUserProfile } from 'databases/TagDB';
import {
  DBCreateMessage,
  DBUpdateMessage,
  DBDeleteMessage,
} from 'databases/messages/Message.UserProfile';
import ConnectUsersDatabase from 'databases/clusters/ConnectUsersDB';
import userProfileDB from 'databases/schemas/Schema.UserProfile';

const ErrorMessage: IError = {
  name: 'Internal Server Error',
  message: 'No method has been specified',
};

async function OperateUserProfile(
  Type: 'CREATE' | 'UPDATE' | 'DELETE',
  Data?: FetchDataType,
) {
  if (Type === 'CREATE' && Data?.create) {
    return await CREATE_USER_PROFILE({ _data: Data.create });
  }
  if (Type === 'UPDATE' && Data?.uid && Data?.update) {
    return await UPDATE_USER_PROFILE({ _uid: Data.uid, _data: Data.update });
  }
  if (Type === 'DELETE' && Data?.uid) {
    return await DELETE_USER_PROFILE({ _uid: Data.uid });
  } else throw new IError(ErrorMessage);
}

export default OperateUserProfile;
