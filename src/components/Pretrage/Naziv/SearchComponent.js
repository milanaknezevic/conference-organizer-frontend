import React from "react";
import { Input, Space } from "antd";

const { Search } = Input;

const SearchComponent = (props) => {
  const { onSearch } = props;

  const searchStyle = {
    border: "1px solid purple", // Postavite ljubičasti okvir
    borderRadius: "6px",
  };

  return (
    <Space direction="vertical">
      <Search
        allowClear
        placeholder="Pretraži po nazivu..."
        onSearch={onSearch}
        style={searchStyle} // Dodajte stilove ovdje
      />
    </Space>
  );
};

export default SearchComponent;
