import React from 'react';
import { Avatar, Col, List, Row, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useShallowEqualSelector } from 'core/hooks/useShallowEqualSelector';
import { STATE_NAME } from 'state/users/constant';

const SearchResult = ({}) => {
  const loading = useShallowEqualSelector((store) => store[STATE_NAME].loading);
  const users = useShallowEqualSelector((store) => store[STATE_NAME].users);

  return (
    <Row className="container mt-4">
      <Col xs={24}>
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={({ login, html_url, score, avatar_url }) => (
            <List.Item>
              <Skeleton loading={loading} paragraph={{ rows: 0 }} active avatar>
                <Link to={`/user/${login}`}>
                  <List.Item.Meta
                    avatar={<Avatar src={avatar_url} />}
                    title={
                      <a
                        href={html_url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {login}
                      </a>
                    }
                  />
                </Link>
              </Skeleton>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default React.memo(SearchResult);
