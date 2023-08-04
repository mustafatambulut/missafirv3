import { createRef, useEffect, useState } from "react";
import { map } from "lodash";

import SortIcon from "../../../../public/images/sort.svg";
import OutsideClickHandler from "react-outside-click-handler";

const SelectSort = () => {
  const sortMenuRef = createRef();
  const [activeSort, setActiveSort] = useState(0);

  const sortOptions = [
    { attributes: { label: "Artan Fiyat", value: "priceAsc" } },
    { attributes: { label: "Azalan Fiyat", value: "priceDesc" } },
    { attributes: { label: "Yeniden Eskiye", value: "newOld" } },
    { attributes: { label: "Eskiden Yeniye", value: "oldNew" } },
    { attributes: { label: "Çok Değerlendirilenler", value: "mostRated" } },
    { attributes: { label: "Yeni Eklenenler", value: "newAdded" } }
  ];

  //
  // const config = {
  //   imageShow: true,
  //   isSearchable: false,
  //   defaultValue: sortOptions[0],
  //   theme: (theme: Theme) => ({
  //     ...theme,
  //     borderRadius: 8,
  //     width: 400,
  //     colors: {
  //       ...theme.colors,
  //       primary25: "white",
  //       primary: "white"
  //     }
  //   })
  // };
  const handleOutsideClick = () => {
    sortMenuRef.current?.removeAttribute("open");
  };
  useEffect(() => {
    sortMenuRef.current?.removeAttribute("open");
  }, [activeSort, sortMenuRef]);
  return (
    <div>
      {/*<div className="dropdown">*/}
      {/*  <label*/}
      {/*    tabIndex={0}*/}
      {/*    className="border border-gray-200 px-3 py-2 rounded-lg text-gray-500 text-base flex gap-3 cursor-pointer">*/}
      {/*    <SortIcon />*/}
      {/*    <span>Sırala</span>*/}
      {/*  </label>*/}
      {/*  <ul*/}
      {/*    tabIndex={0}*/}
      {/*    className="dropdown-content z-[1] menu p-2 shadow rounded-box left-[-50%] mt-3 bg-white">*/}
      {/*    {map(sortOptions, (option, key) => (*/}
      {/*      <li*/}
      {/*        key={option.attributes.value}*/}
      {/*        onClick={() => setActiveSort(key)}>*/}
      {/*        <a className="active:bg-transparent">{option.attributes.label}</a>*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*</div>*/}

      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <details className="dropdown dropdown-end" ref={sortMenuRef}>
          <summary className="border border-gray-200 px-3 py-2 rounded-lg text-gray-500 text-base flex gap-3 cursor-pointer">
            <SortIcon />
            <span className="hidden lg:block">Sırala</span>
          </summary>
          <ul className="dropdown-content z-[1] menu p-2 shadow rounded-box mt-3 bg-white">
            {map(sortOptions, (option, key) => (
              <li
                key={option.attributes.value}
                onClick={() => setActiveSort(key)}>
                <a className="active:bg-transparent">
                  {option.attributes.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </OutsideClickHandler>
      {/*<Select*/}
      {/*  className="min-w-[170px] z-50"*/}
      {/*  controlInnerClassName="flex w-full"*/}
      {/*  singleValueClassName="flex gap-3"*/}
      {/*  optionClassName="flex gap-3"*/}
      {/*  instanceId="filter-select"*/}
      {/*  components={{*/}
      {/*    Option: Option,*/}
      {/*    Control: Control,*/}
      {/*    Menu: SelectMenu,*/}
      {/*    SingleValue: SingleValue,*/}
      {/*    MenuList: SelectMenuList,*/}
      {/*    IndicatorSeparator: () => null,*/}
      {/*    DropdownIndicator: (props) => (*/}
      {/*      <DropdownIndicator props={props} showIndicator={true} />*/}
      {/*    )*/}
      {/*  }}*/}
      {/*  theme={get(config, "theme")}*/}
      {/*  options={sortOptions}*/}
      {/*  imageShow={get(config, "imageShow")}*/}
      {/*  defaultValue={get(config, "defaultValue")}*/}
      {/*  isSearchable={get(config, "isSearchable")}*/}
      {/*/>*/}
    </div>
  );
};

export default SelectSort;
