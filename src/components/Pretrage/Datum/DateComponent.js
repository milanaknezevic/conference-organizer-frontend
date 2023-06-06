import React from "react";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const DateComponent = (props) => {
  const { handleDateChange } = props;

  return (
    <div>
      <Space>
        <RangePicker allowClear onChange={handleDateChange} />
      </Space>
    </div>
  );
};

export default DateComponent;
