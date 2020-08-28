import React from 'react';
import { Avatar, Col, Row } from 'antd';
import { isValidURL } from 'utils/helper';
import { HeartFilled } from '@ant-design/icons';
import { useShallowEqualSelector } from 'core/hooks/useShallowEqualSelector';
import { STATE_NAME as USES_STATE_NAME } from 'state/users/constant';

const UserInfo = ({}) => {
  const detailUser = useShallowEqualSelector(
    (store) => store[USES_STATE_NAME].detailUser
  );

  return (
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
              <h2 className="user-name">
                <a
                  href={detailUser?.html_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <strong>{detailUser?.name}</strong>
                </a>
              </h2>
            </li>
            <li className="mb-1">
              {isValidURL(detailUser?.bio) ? (
                <a
                  href={detailUser?.bio}
                  rel="noopener noreferrer"
                  target="_blank"
                >
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
  );
};

export default React.memo(UserInfo);
