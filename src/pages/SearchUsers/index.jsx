import React from 'react';
import { Col, Row } from 'antd';
import InputDebounce from 'components/InputDebounce';
import useActions from 'core/hooks/useActions';
import { onSearchUsers } from 'state/users/action';
import { useShallowEqualSelector } from 'core/hooks/useShallowEqualSelector';
import { STATE_NAME } from 'state/users/constant';
import './style.scss';
import GithubFilled from '@ant-design/icons/lib/icons/GithubFilled';
import SearchResult from 'pages/SearchUsers/SearchResult';

const SearchUsers = ({}) => {
  const onSearchUsersAction = useActions(onSearchUsers);
  const keyword = useShallowEqualSelector((store) => store[STATE_NAME].keyword);

  return (
    <div className="search-user-page info-user-wrapper">
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

      <SearchResult />
    </div>
  );
};

export default React.memo(SearchUsers);
