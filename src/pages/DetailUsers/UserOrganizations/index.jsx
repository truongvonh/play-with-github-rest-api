import React from 'react';
import { Avatar, Col, Row, Tooltip } from 'antd';
import { useShallowEqualSelector } from 'core/hooks/useShallowEqualSelector';
import { STATE_NAME as ORGANIZATION_STATE_NAME } from 'state/organizations/constant';
import { STATE_NAME as USES_STATE_NAME } from 'state/users/constant';

const UserOrganizations = ({}) => {
  const organizations = useShallowEqualSelector(
    (store) => store[ORGANIZATION_STATE_NAME].organizations
  );

  const detailUser = useShallowEqualSelector(
    (store) => store[USES_STATE_NAME].detailUser
  );

  return (
    <section className="user-orgs">
      <Row className="container">
        <Col xs={24}>
          <h2 className="d-flex justify-content-center mb-3 mt-5 fz-20">
            <strong>Organizations</strong>
          </h2>
          {organizations.length ? (
            <ul className="m-0 p-0 d-flex flex-wrap justify-content-center">
              {organizations.map(({ avatar_url, login }, index) => (
                <li key={index} className="m-2">
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
  );
};

export default React.memo(UserOrganizations);
