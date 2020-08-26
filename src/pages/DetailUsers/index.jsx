import React, { useEffect } from 'react';
import {
  Avatar,
  Badge,
  Col,
  Divider,
  List,
  Row,
  Skeleton,
  Spin,
  Tag,
  Tooltip,
} from 'antd';
import { useParams } from 'react-router-dom';
import useActions from 'core/hooks/useActions';
import { onFetchAllUserRepo } from 'state/repositories/action';
import { useShallowEqualSelector } from 'core/hooks/useShallowEqualSelector';
import { STATE_NAME } from 'state/repositories/constant';
import { STATE_NAME as ORGANIZATION_STATE_NAME } from 'state/organizations/constant';
import { STATE_NAME as USES_STATE_NAME } from 'state/users/constant';
import { onFetchAllUserOrganizations } from 'state/organizations/action';
import { fetchDetailUsers } from 'state/users/action';
import { HeartFilled } from '@ant-design/icons';
import { isValidURL, randomArrayItem } from 'utils/helper';
import { REPOSITORY_STATE_NAME } from 'state/repositories';
import FundFilled from '@ant-design/icons/lib/icons/FundFilled';
import StarFilled from '@ant-design/icons/lib/icons/StarFilled';
import { ALL_COLORS } from 'constants/static/color';

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
  const loadingRepositories = useShallowEqualSelector(
    (store) => store[REPOSITORY_STATE_NAME].loading
  );
  const organizations = useShallowEqualSelector(
    (store) => store[ORGANIZATION_STATE_NAME].organizations
  );
  const repositories = useShallowEqualSelector(
    (store) => store[STATE_NAME].repositories
  );
  const detailUser = useShallowEqualSelector(
    (store) => store[USES_STATE_NAME].detailUser
  );

  useEffect(() => {
    onFetchAllUserRepoAction(userName);
    onFetchAllUserOrganizationsAction(userName);
    fetchDetailUsersAction(userName);
  }, []);

  return (
    <Spin spinning={loading}>
      <section className="user-info">
        <Row className="container mt-4" justify="center">
          <Col xs={24} lg={8} className="d-flex justify-content-center">
            <Avatar
              size={250}
              className="flex-shrink-0 mb-4"
              src={detailUser?.avatar_url}
              alt=""
            />
          </Col>

          <Col xs={24} className="d-flex justify-content-center">
            <ul className="m-0 p-0">
              <li className="mb-1 text-center">
                <h2>
                  <a href={detailUser?.html_url} rel="noopener noreferrer" target="_blank">
                    <strong>{detailUser?.name}</strong>
                  </a>
                </h2>
              </li>
              <li className="mb-1">
                {isValidURL(detailUser?.bio) ? (
                  <a href={detailUser?.bio} rel="noopener noreferrer" target="_blank">
                    {detailUser?.bio}
                  </a>
                ) : (
                  <p>{detailUser?.bio}</p>
                )}
              </li>
              <li>
                <HeartFilled />
                <span className="ml-1">{detailUser?.followers}</span>
                <strong className="ml-1"> followers</strong> -{' '}
                {detailUser?.following}
                <strong className="ml-1">following</strong>
              </li>
            </ul>
          </Col>
        </Row>
      </section>

      <section className="user-orgs">
        <Row className="container">
          <Col xs={24}>
            <h2 className="d-flex justify-content-center mb-3 mt-5 fz-20">
              <strong>Organizations</strong>
            </h2>
            {organizations.length ? (
              <ul className="m-0 p-0 d-flex flex-wrap justify-content-center">
                {organizations.map(({ avatar_url, login }, index) => (
                  <li key={index} className="mx-2">
                    <Tooltip title={login}>
                      <Avatar
                        shape="square"
                        size={60}
                        src={avatar_url}
                        alt={login}
                      />
                    </Tooltip>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ textAlign: 'center' }}>
                {detailUser?.name} is not a member of any organizations
              </p>
            )}
          </Col>
        </Row>
      </section>

      <section className="all-repositories pb-5">
        <Row className="container pt-4">
          <Col xs={24}>
            <Divider />

            <h2 className="d-flex justify-content-center mb-5">
              <Badge count={repositories.length}>
                <strong className="fz-20">Repositories</strong>
              </Badge>
            </h2>
          </Col>
          <Col xs={24}>
            <List
              bordered
              loading={loadingRepositories}
              dataSource={repositories}
              renderItem={({
                name,
                forks_count,
                size,
                language,
                description,
                html_url,
              }) => (
                <List.Item className="d-flex flex-column">
                  <Skeleton loading={loading} paragraph={{ rows: 2 }} active>
                    <h3 className="fz-18">
                      <a href={html_url} target="_blank" rel="noopener noreferrer">
                        <strong>{name}</strong>
                      </a>
                    </h3>
                    <p>{description}</p>
                    <ul className="m-0 p-0 d-flex justify-content-center">
                      {language ? (
                        <li>
                          <Tag color={randomArrayItem(ALL_COLORS)}>
                            {language}{' '}
                          </Tag>
                        </li>
                      ) : null}

                      <li className="ml-2">
                        <FundFilled />
                        <span className="ml-1">{forks_count} </span>
                        forks
                      </li>

                      <li className="ml-2">
                        <StarFilled />
                        <span className="ml-1">{size}</span>
                      </li>
                    </ul>
                  </Skeleton>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </section>
    </Spin>
  );
};

export default React.memo(DetailUsers);
