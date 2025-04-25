import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

type ContextType = GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;

/**
 * @Access_Denied_If_User_Exist
 **/
export const NoAccessToUserExistPages = (gssp: GetServerSideProps) => {
  return async (Context: ContextType) => {
    const { req } = Context;
    const token = req.cookies.token;
    if (token) {
      return {
        redirect: {
          destination: '/',
          statusCode: 302,
        },
      };
    }
    return await gssp(Context);
  };
};

/**
 * @Access_Denied_If_User_Not_Exist
 **/
export const NoAccessToNullUserPages = (gssp: GetServerSideProps) => {
  return async (Context: ContextType) => {
    const { req } = Context;
    const token = req.cookies.token;
    if (!token) {
      return {
        redirect: {
          destination: '/',
          statusCode: 302,
        },
      };
    }
    return await gssp(Context);
  };
};

/**
 * @Access_Denied_For_Null_Pages
 **/
export const NoAccessToNullPages = () => {
  return async () => {
    return {
      redirect: {
        destination: '/',
        statusCode: 302,
      },
    };
  };
};
