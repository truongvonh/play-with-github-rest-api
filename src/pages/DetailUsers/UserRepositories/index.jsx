import React from 'react';
import { Badge, Col, Divider, List, Row, Skeleton, Tag } from 'antd';
import { randomArrayItem } from 'utils/helper';
import { ALL_COLORS } from 'constants/static/color';
import FundFilled from '@ant-design/icons/lib/icons/FundFilled';
import StarFilled from '@ant-design/icons/lib/icons/StarFilled';
import { useShallowEqualSelector } from 'core/hooks/useShallowEqualSelector';
import { REPOSITORY_STATE_NAME } from 'state/repositories';
import { STATE_NAME } from 'state/repositories/constant';

const UserRepositories = ({}) => {
  const loadingRepositories = useShallowEqualSelector(
    (store) => store[REPOSITORY_STATE_NAME].loading
  );
  const repositories = useShallowEqualSelector(
    (store) => store[STATE_NAME].repositories
  );
  return (
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
                <Skeleton
                  loading={loadingRepositories}
                  paragraph={{ rows: 2 }}
                  active
                >
                  <h3 className="fz-18">
                    <a
                      href={html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
  );
};

export default React.memo(UserRepositories);
