import React from 'react';
import { Avatar, Col, List, Row, Skeleton } from 'antd';
import InputDebounce from 'components/InputDebounce';
import useActions from 'core/hooks/useActions';
import { onSearchUsers } from 'state/users/action';
import { useShallowEqualSelector } from 'core/hooks/useShallowEqualSelector';
import { STATE_NAME } from 'state/users/constant';
import './style.scss';
import { Link } from 'react-router-dom';
import GithubFilled from '@ant-design/icons/lib/icons/GithubFilled';

const SearchUsers = ({}) => {
  const onSearchUsersAction = useActions(onSearchUsers);
  const keyword = useShallowEqualSelector((store) => store[STATE_NAME].keyword);
  const loading = useShallowEqualSelector((store) => store[STATE_NAME].loading);
  const users = useShallowEqualSelector((store) => store[STATE_NAME].users);

  return (
    <div className="search-user-page">
      <Row className="container mt-4">
        <Col xs={24}>
          <InputDebounce
            placeholder="Search users on the github ... "
            defaultVal={keyword}
            prefix={<GithubFilled />}
            onChange={onSearchUsersAction}
          />
        </Col>
      </Row>

      <Row className="container mt-4">
        <Col xs={24}>
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={({ login, html_url, score, avatar_url }) => (
              <List.Item>
                <Skeleton
                  loading={loading}
                  paragraph={{ rows: 0 }}
                  active
                  avatar
                >
                  <Link to={`/user/${login}`}>
                    <List.Item.Meta
                      avatar={<Avatar src={avatar_url} />}
                      title={
                        <a href={html_url} rel="noopener noreferrer" target="_blank">
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
    </div>
  );
};

export default React.memo(SearchUsers);
