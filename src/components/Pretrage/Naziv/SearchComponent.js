import React from "react";
import { Input, Space } from "antd";

const { Search } = Input;

const SearchComponent = (props) => {
  const { onSearch } = props;
  return (
    <Space direction="vertical">
      <Search
        allowClear
        placeholder="Pretraži po nazivu..."
        onSearch={onSearch}
      />
    </Space>
  );
};

export default SearchComponent;
