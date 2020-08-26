import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const InputDebounce = ({ defaultVal, placeholder, prefix, onChange }) => {
  const [notRunAtFirst, setNotRunAtFirst] = useState(true);
  const [val, setVal] = useState(defaultVal);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (notRunAtFirst) {
      setNotRunAtFirst(false);
    } else {
      setVal(defaultVal);
    }
  }, [defaultVal]);

  const handleChange = (val) => {
    setVal(val);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        onChange(val);
      }, 800)
    );
  };

  return (
    <Input
      placeholder={placeholder}
      prefix={prefix}
      value={val}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

InputDebounce.defaultProps = {
  defaultVal: '',
  placeholder: '',
  prefix: <SearchOutlined style={{ color: '#C4C4C4' }} />,
  onChange: () => {},
};

InputDebounce.propTypes = {
  defaultVal: PropTypes.string,
  placeholder: PropTypes.string,
  prefix: PropTypes.element,
  onChange: PropTypes.func,
};

export default InputDebounce;
