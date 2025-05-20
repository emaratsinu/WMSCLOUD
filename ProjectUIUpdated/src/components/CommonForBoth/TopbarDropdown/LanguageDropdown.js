import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { get, map } from "lodash";
import { withTranslation } from "react-i18next";

// i18n
import i18n from "../../../i18n";
import languages from "../../../common/languages";

const LanguageDropdown = () => {
  const [selectedLang, setSelectedLang] = useState("ar"); // Default to Arabic
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    // Get saved language from localStorage, default to Arabic if not set
    const currentLanguage = localStorage.getItem("I18N_LANGUAGE") || "ar";
    setSelectedLang(currentLanguage);
    i18n.changeLanguage(currentLanguage); // Ensure i18n updates on load
  }, []);

  const changeLanguageAction = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
    setSelectedLang(lang);
  };

  const toggle = () => {
    setMenu(!menu);
  };

  return (
    <Dropdown isOpen={menu} toggle={toggle} className="d-inline-block">
      <DropdownToggle className="btn header-item" tag="button">
        <img
          src={get(languages, `${selectedLang}.flag`)}
          alt="Language"
          height="16"
          className="me-1"
        />
      </DropdownToggle>
      <DropdownMenu className="language-switch dropdown-menu-end">
        {map(Object.keys(languages), (key) => (
          <DropdownItem
            key={key}
            onClick={() => changeLanguageAction(key)}
            className={`notify-item ${selectedLang === key ? "active" : ""}`}
          >
            <img
              src={get(languages, `${key}.flag`)}
              alt="Language"
              className="me-1"
              height="12"
            />
            <span className="align-middle">{get(languages, `${key}.label`)}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default withTranslation()(LanguageDropdown);
