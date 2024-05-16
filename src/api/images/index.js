import { instance } from 'api/instance';

const ERROR_MESSAGE_DEFAULT =
  'Application internal error. Please contact application administrator.';
const ERROR_MESSAGE_TIMEOUT =
  'Sorry, but your request was canceled due to a long time waiting for a response from the server.';

export const getImagesApi = async (searchQuery, page, perPage) => {
  const { data } = await instance(`?q=${searchQuery}`, {
    params: {
      page: page,
      per_page: perPage,
      image_type: 'photo',
    },
    signal: AbortSignal.timeout(5000), //https://axios-http.com/docs/cancellation
  }).catch(function (error) {
    if (error.code === 'ERR_CANCELED') {
      throw new Error(ERROR_MESSAGE_TIMEOUT);
    } else {
      const message = `${ERROR_MESSAGE_DEFAULT} Reason: '${error.message}'.`;
      throw new Error(message);
    }
  });
  return data;
};

export default getImagesApi;
