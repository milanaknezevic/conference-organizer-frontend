import { Select } from "antd";
const FilterComponent = (props) => {
  const { handleChange } = props;
  return (
    <Select
      placeholder="Status"
      onChange={handleChange}
      allowClear
      options={[
        {
          label: "Status",
          options: [
            {
              //aktivna true 0
              label: "Aktivna",
              value: "false",
            },
            {
              label: "Završena",
              value: "true",
            },
          ],
        },
      ]}
    />
  );
};
export default FilterComponent;
