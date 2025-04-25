// import { parse } from 'next-useragent';

// type ServerProps = {
//   isMobile: boolean;
// };

// export const getServerSideProps: GetServerSideProps<ServerProps> =
//   ((ReduxStore) => async (context) => {
//     const { req } = context;
//     const userAgent = req.headers['user-agent'] ?? '';
//     const isMobile = parse(userAgent).isMobile;
//     ReduxStore.dispatch(setDevice(isMobile));
//     return {
//       props: {
//         isMobile,
//       },
//     };
//   });

// eslint-disable-next-line @typescript-eslint/no-empty-function
function DeviceDetectSSR() {}

export default DeviceDetectSSR;
