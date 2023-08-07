import { createRef, useEffect, useState } from "react";
import { get, map } from "lodash";
import OutsideClickHandler from "react-outside-click-handler";

import SortIcon from "../../../../public/images/sort.svg";

const SelectSort = () => {
  const sortMenuRef = createRef();
  const [activeSort, setActiveSort] = useState<number>(0);

  // todo: dil seçeneği ekleyince güncellenecek
  const sortOptions = [
    { attributes: { label: "Artan Fiyat", value: "priceAsc" } },
    { attributes: { label: "Azalan Fiyat", value: "priceDesc" } },
    { attributes: { label: "Yeniden Eskiye", value: "newOld" } },
    { attributes: { label: "Eskiden Yeniye", value: "oldNew" } },
    { attributes: { label: "Çok Değerlendirilenler", value: "mostRated" } },
    { attributes: { label: "Yeni Eklenenler", value: "newAdded" } }
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
          <summary className="border border-gray-200 px-3 py-2 rounded-lg text-gray-500 text-base flex gap-3 cursor-pointer">
            <SortIcon />
            <span className="hidden lg:block">Sırala</span>
          </summary>
          <ul className="dropdown-content z-[1] menu p-2 shadow rounded-box mt-3 bg-white">
            {map(sortOptions, (option, key) => (
              <li
                key={get(option, "attributes.value")}
                onClick={() => setActiveSort(key)}>
                <a className="active:bg-transparent">
                  {get(option, "attributes.label")}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </OutsideClickHandler>
    </div>
  );
};

export default SelectSort;
