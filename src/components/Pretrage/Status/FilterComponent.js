import { Select } from "antd";
const FilterComponent = (props) => {
  const { handleChange } = props;
  const searchStyle = {
    border: "1px solid purple", // Postavite ljubičasti okvir
    borderRadius: "6px",
  };
  return (
    <Select
      placeholder="Status"
      onChange={handleChange}
      allowClear
      style={searchStyle} // Dodajte stilove ovdje
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
