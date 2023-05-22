import React from "react";
import { changeLanguage } from "../services/application.service";
import { supportedLanguages } from "../i8n/init";
import { Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { ZhihuOutlined } from "@ant-design/icons";

const LanguageSelector = (props) => {
  const { t } = useTranslation();
  const onClick = ({ key }) => {
    changeLanguage(key);
  };
  const menu = (
    <Menu onClick={onClick} selectedKeys={[localStorage.getItem("language")]}>
      {supportedLanguages.map((key) => (
        <Menu.Item key={key}>{t(key)}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu}>
        <div>
          <ZhihuOutlined />
        </div>
      </Dropdown>
    </div>
  );
};

export default LanguageSelector;
