import { createRef, useEffect, useState } from "react";
import { get, map } from "lodash";
import classNames from "classnames";
import OutsideClickHandler from "react-outside-click-handler";

import SortIcon from "../../../../public/images/sort.svg";

const SelectSort = () => {
  const sortMenuRef = createRef();
  const [activeSort, setActiveSort] = useState<number>(0);

  const sortClass = classNames(
    "border px-3 py-2 rounded-lg text-gray-500 text-base flex gap-3 cursor-pointer",
    {
      "border-gray-200": activeSort === 0,
      "border-primary": activeSort > 0
    }
  );
  // todo: dil seçeneği ekleyince güncellenecek
  const sortOptions = [
    { label: "Sırala", value: "" },
    { label: "Artan Fiyat", value: "priceAsc" },
    { label: "Azalan Fiyat", value: "priceDesc" },
    { label: "Yeniden Eskiye", value: "newOld" },
    { label: "Eskiden Yeniye", value: "oldNew" },
    { label: "Çok Değerlendirilenler", value: "mostRated" },
    { label: "Yeni Eklenenler", value: "newAdded" }
  ];

  const handleOutsideClick = () => {
    sortMenuRef.current?.removeAttribute("open");
  };

  useEffect(() => {
    sortMenuRef.current?.removeAttribute("open");
  }, [activeSort, sortMenuRef]);

  return (
    <div>
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <details className="dropdown dropdown-end" ref={sortMenuRef}>
          <summary className={sortClass}>
            <SortIcon />
            <span className="hidden lg:block">Sırala</span>
          </summary>
          <ul className="dropdown-content z-[1] menu p-2 shadow rounded-box mt-3 bg-white">
            {map(sortOptions, (option, key) => (
              <li key={get(option, "value")} onClick={() => setActiveSort(key)}>
                <a className="active:bg-transparent">{get(option, "label")}</a>
              </li>
            ))}
          </ul>
        </details>
      </OutsideClickHandler>
    </div>
  );
};

export default SelectSort;
