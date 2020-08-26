import request from 'core/http_request/base';
import { serialize } from 'utils/helper';

class RequestUtils {
  constructor({ endpoint = process.env.REACT_APP_API_URL, customHeaders }) {
    this.endpoint = endpoint;
    this.requestOptions = {
      url: endpoint,
    };

    if (customHeaders) {
      this.requestOptions = {
        ...this.requestOptions,
        headers: customHeaders,
      };
    }
  }

  get({ query = {} }) {
    return request({
      ...this.requestOptions,
      url: `${this.endpoint}?${serialize(query)}`,
      method: 'GET',
    });
  }

  post(payload, query) {
    const queryString = serialize(query);
    return request({
      ...this.requestOptions,
      method: 'POST',
      url: query ? `${this.endpoint}?${queryString}` : this.endpoint,
      data: payload,
    });
  }

  put(payload) {
    return request({
      ...this.requestOptions,
      method: 'PUT',
      data: payload,
    });
  }

  delete(payload) {
    return request({
      ...this.requestOptions,
      method: 'DELETE',
      data: payload,
    });
  }

  // async upload(files, type, config) {
  //   const preSignFiles = files.map((file) => ({
  //     file_type: file.type,
  //   }));
  //
  //   const getPreSignedUrl = async () => {
  //     return await request({
  //       // url: `${isProduction ? process.env.API_URL_STAGING : process.env.API_URL}/apiV1/common/presigned-url`,
  //       url: `${process.env.API_URL_STAGING}/apiV1/common/presigned-url`,
  //       method: 'POST',
  //       data: {
  //         photos: preSignFiles,
  //         type,
  //       },
  //       config,
  //     });
  //   };
  //
  //   const preSignedUrls = await getPreSignedUrl();
  //
  //   const promises = preSignedUrls.map(
  //     (preSignedUrl, index) =>
  //       new Promise(async (resolve, reject) => {
  //         try {
  //           const file = files[index];
  //           const uploader = async (uploadUrl) => {
  //             await request({
  //               url: uploadUrl,
  //               method: 'PUT',
  //               headers: {
  //                 'content-type': file.type,
  //               },
  //               data: file,
  //               withCredentials: undefined,
  //               credentials: undefined,
  //               upload: true,
  //             });
  //
  //             return uploadUrl.split('?')[0];
  //           };
  //
  //           const [thumb, origin] = await Promise.all([
  //             uploader(preSignedUrl.thumb),
  //             uploader(preSignedUrl.origin),
  //           ]);
  //
  //           resolve({ thumb, origin });
  //         } catch (e) {
  //           reject(e);
  //         }
  //       })
  //   );
  //
  //   return await Promise.all(promises);
  // }
}

export default RequestUtils;
