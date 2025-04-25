'use server';

import { revalidateTag } from 'next/cache';
import { TagForUserProfile } from 'databases/TagDB';
import {
  DBCreateMessage,
  DBDeleteMessage,
  DBUpdateMessage,
} from 'databases/messages/Message.UserProfile';
import ConnectUsersDatabase from 'databases/clusters/ConnectUsersDB';
import userProfileDB from 'databases/schemas/Schema.UserProfile';

export async function CREATE_USER_PROFILE({ _data }: POSTType) {
  await ConnectUsersDatabase();
  await userProfileDB.create(_data);
  revalidateTag(TagForUserProfile);
  return DBCreateMessage as ISuccess;
}

export async function UPDATE_USER_PROFILE({ _uid, _data }: PUTType) {
  await ConnectUsersDatabase();
  await userProfileDB.findOneAndUpdate({ _uid: _uid }, { $set: _data });
  revalidateTag(TagForUserProfile);
  return DBUpdateMessage as ISuccess;
}

export async function DELETE_USER_PROFILE({ _uid }: DELETEType) {
  await ConnectUsersDatabase();
  await userProfileDB.findOneAndDelete({ _uid: _uid });
  revalidateTag(TagForUserProfile);
  return DBDeleteMessage as ISuccess;
}
