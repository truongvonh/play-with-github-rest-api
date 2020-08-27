import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';
import useActions from 'core/hooks/useActions';
import { onFetchAllUserRepo } from 'state/repositories/action';
import { useShallowEqualSelector } from 'core/hooks/useShallowEqualSelector';
import { STATE_NAME } from 'state/repositories/constant';
import { onFetchAllUserOrganizations } from 'state/organizations/action';
import { fetchDetailUsers } from 'state/users/action';
import UserOrganizations from 'pages/DetailUsers/UserOrganizations';
import UserRepositories from 'pages/DetailUsers/UserRepositories';
import UserInfo from 'pages/DetailUsers/UserInfo';

const DetailUsers = ({}) => {
  const { user_name: userName } = useParams();

  const [
    onFetchAllUserRepoAction,
    onFetchAllUserOrganizationsAction,
    fetchDetailUsersAction,
  ] = useActions([
    onFetchAllUserRepo,
    onFetchAllUserOrganizations,
    fetchDetailUsers,
  ]);
  const loading = useShallowEqualSelector((store) => store[STATE_NAME].loading);

  useEffect(() => {
    onFetchAllUserRepoAction(userName);
    onFetchAllUserOrganizationsAction(userName);
    fetchDetailUsersAction(userName);
  }, []);

  return (
    <Spin spinning={loading}>
      <UserInfo />
      <UserOrganizations />
      <UserRepositories />
    </Spin>
  );
};

export default React.memo(DetailUsers);
