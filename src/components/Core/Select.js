import React from "react";
import { withTheme } from "styled-components";

import Select from "react-select";
import { colorStyle } from "styled-system";

const defaultOptions = [
];

const getCustomStyles = (theme, accentColor, bg, border, indicator) => {
  return {
    dropdownIndicator: () => {
      return {
        display: !indicator && "none",
      };
    },
    indicatorSeparator: () => { },
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? theme.colors[accentColor] : theme.colors.dark,
        textAlign: "left",
        //backgroundColor:  theme.colors,
      };
    },
    control: (provided, state) => {
      return {
        ...provided,
        border: !border
          ? "none"
          : state.menuIsOpen || state.isFocused
            ? `1px solid ${theme.colors[accentColor]} !important`
            : `1px solid ${theme.colors.border} !important`,
        borderRadius: 10,
        padding: "0.25rem 1rem",
        width: "100%",  /* tablo için % yerine px yazdık */
        height: "45px",
        outline: "none",
        boxShadow: "none",
        textAlign: "left",
        backgroundColor: bg,

      };
    },
  };
};

const SelectStyled = ({
  theme,
  bg = "#fff",
  border = true,
  accentColor = "success",
  name = "item",
  indicator = true,
  options = defaultOptions,
  error,
  ...rest
  
}) => {
  return (<>
    <Select
      styles={getCustomStyles(theme, accentColor, bg, border, indicator)}
      //defaultValue={options[1]}
      name={name}
      options={options}
      instanceId="inId"
      {...rest}
      
    />
    <div class="text-red" >{error}</div>
  </>
  );
};

export default withTheme(SelectStyled);
