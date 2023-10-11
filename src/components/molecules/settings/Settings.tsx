"use client";
import { get, map } from "lodash";
import { useFormik } from "formik";
import classNames from "classnames";
import { useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";
import Typography from "@/components/atoms/typography/Typography";

const Settings = () => {
  const { user } = useAppSelector((state) => state.profileReducer);
  const t = useTranslations()

  const checkboxClass = (type: string) => {
    return classNames("checkbox-primary", {
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
      // todo: event eklenecek
      //alert("Updated!");
    }
  });

  const { handleChange } = formik;

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
          <Typography variant="h4" element="h4" className="mb-5 lg:mb-8">{item.title}</Typography>
          <div className="grid grid-cols-1 gap-6">
            {map(item.items, (subItem, subKey) => (
              <div
                key={subKey}
                className="flex items-center w-full justify-between">
                <Typography variant="p3" element="p" className="text-gray-700 lg:text-gray-600 w-64 lg:w-full">
                  {subItem.label}
                </Typography>
                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    name={get(subItem, "section")}
                    onChange={handleChange}
                    value={get(subItem, "section")}
                    //checked={false}
                    className={checkboxClass(get(subItem, "control"))}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="text-primary">
        <Typography variant="p3" element="span" className="font-mi-sans-semi-bold">
          {t("need_to_deactivate_your_account")}
        </Typography>
        <Typography variant="p4" element="span" className="cursor-pointer ml-3">
          {t("deal_with_it_now")}
        </Typography>
      </div>
    </div>
  );
};

export default Settings;
