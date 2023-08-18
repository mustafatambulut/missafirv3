"use client";
import { get, map } from "lodash";
import { useFormik } from "formik";
import classNames from "classnames";
import { useAppSelector } from "@/redux/hooks";

const Settings = () => {
  const { user } = useAppSelector((state) => state.profileReducer);

  const checkboxClass = (type: string) => {
    return classNames("checkbox-primary",{
      toggle: type === "toggle",
      checkbox: type !== "toggle"
    });
  };

  const initialValues = {
    notifications: get(user, "notifications"),
    contact_permissions: get(user, "notifications")
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      alert("Updated!");
    }
  });

  const { values, handleChange } = formik;

  const mockSettingsData = [
    {
      title: "Bildirim Ayarları",
      section: "notifications",
      items: [
        {
          label:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ligula dolor, bibendum ut sollicitudin in, dapibus eu lorem. Nulla quis massa et elit dapibus hendrerit.",
          section: "email",
          control: "toggle"
        },
        {
          label:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ligula dolor, bibendum ut sollicitudin in, dapibus eu lorem. Nulla quis massa et elit dapibus hendrerit.",
          section: "push",
          control: "toggle"
        },
        {
          label:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ligula dolor, bibendum ut sollicitudin in, dapibus eu lorem. Nulla quis massa et elit dapibus hendrerit.",
          section: "sms",
          control: "toggle"
        }
      ]
    },
    {
      title: "Tercih Edilen İletişim İzinleri",
      section: "contact_permissions",
      items: [
        {
          label:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ligula dolor, bibendum ut sollicitudin in, dapibus eu lorem. Nulla quis massa et elit dapibus hendrerit.",
          section: "email",
          control: "checkbox"
        },
        {
          label:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ligula dolor, bibendum ut sollicitudin in, dapibus eu lorem. Nulla quis massa et elit dapibus hendrerit.",
          section: "push",
          control: "checkbox"
        },
        {
          label:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ligula dolor, bibendum ut sollicitudin in, dapibus eu lorem. Nulla quis massa et elit dapibus hendrerit.",
          section: "sms",
          control: "checkbox"
        }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1">
      {map(mockSettingsData, (item, key) => (
        <div key={key} className="mb-10">
          <div className="text-3xl mb-5 lg:mb-8">{item.title}</div>
          <div className="grid grid-cols-1 gap-6">
            {map(item.items, (subItem, subKey) => (
              <div key={subKey} className="flex items-center w-full justify-between">
                <div className="text-sm lg:text-lg font-mi-sans-semi-bold text-gray-700 lg:text-gray-600 w-64 lg:w-full">
                  {subItem.label}
                </div>
                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    name={`${get(item, "section")}.${get(subItem, "section")}`}
                    onChange={handleChange}
                    value={get(
                      values,
                      `${get(item, "section")}.${get(subItem, "section")}`
                    )}
                    checked={get(
                      values,
                      `${get(item, "section")}.${get(subItem, "section")}`
                    )}
                    className={checkboxClass(get(subItem, "control"))}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="text-primary"><span className="text-base lg:text-lg font-mi-sans-semi-bold">Hesabınızı devre dışı bırakmanız mı gerekiyor?</span><span className="text-base lg:ml-3 cursor-pointer">Bununla şimdi ilgilenin</span></div>
    </div>
  );
};

export default Settings;
