import React from "react";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const DateComponent = (props) => {
  const { handleDateChange } = props;

  const datePickerStyle = {
    borderColor: "purple", // Postavite ljubičastu boju okvira
  };

  return (
    <div>
      <Space>
        <RangePicker
          allowClear
          onChange={handleDateChange}
          placeholder={["Početni datum", "Završni datum"]}
          style={datePickerStyle}
        />
      </Space>
    </div>
  );
};

export default DateComponent;
