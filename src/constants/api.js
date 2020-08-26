import RequestUtils from 'core/http_request';

const ROOT_ENDPOINT = process.env.REACT_APP_API_URL;

export const BASE = {
  async GET_ALL_ENDPOINT() {
    return await new RequestUtils({}).get({});
  },
};

export const REPOSITORY = {
  async GET_ALL_REPOS_BY_USER(userName) {
    const endpoint = `${ROOT_ENDPOINT}/users/${userName}/repos`;
    return await new RequestUtils({ endpoint }).get({});
  },
};

export const ORGANIZATIONS = {
  async GET_ALL_ORGANIZATIONS_BY_USER(userName) {
    const endpoint = `${ROOT_ENDPOINT}/users/${userName}/orgs`;
    return await new RequestUtils({ endpoint }).get({});
  },
};

export const USERS = {
  async SEARCH_USERS(query) {
    const endpoint = `${ROOT_ENDPOINT}/search/users`;
    return await new RequestUtils({ endpoint }).get({ query });
  },

  async DETAIL_USER(userName) {
    const endpoint = `${ROOT_ENDPOINT}/users/${userName}`;
    return await new RequestUtils({ endpoint }).get({});
  },
};
