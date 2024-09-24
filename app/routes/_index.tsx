/**
 * @ref https://marsz.tw/blog/articles/446-超商門市選擇器%28使用電子地圖查詢系統%29
 */
import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "超商門市選擇器" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const form = Object.fromEntries(formData.entries());
  return json(form);
};

export default function Index() {
  const actionData = useActionData();
  const [store, setStore] = useState<sevenEleven>();
  // Using ?index cuz this is the index page that does not have a route, if set to / will be sent to root
  const callbackUrl = "http://localhost:5173?index";

  useEffect(() => {
    if (actionData) {
      if (isSevenEleven(actionData)) return setStore(actionData);
      else return console.error("Invalid 711 callback data");
    }
  }, [actionData]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center font-sans p-4 gap-3">
      <h1 className="text-3xl">歡迎使用統一超商門市選擇器</h1>
      <p>您選擇的門市 ID：{store?.storeid}</p>
      <p>您選擇的門市名稱：{store?.storename}</p>
      <p>您選擇的門市地址：{store?.storeaddress}</p>
      <button className="px-3.5 py-2 border rounded-md hover:bg-black hover:text-white transition-colors duration-200">
        <a
          href={`https://emap.presco.com.tw/c2cemap.ashx?eshopid=870&&servicetype=1&url=${callbackUrl}`}
        >
          點擊選擇門市
        </a>
      </button>
    </div>
  );
}

interface sevenEleven {
  storeid: string;
  storename: string;
  storeaddress: string;
  outside: string;
  ship: string;
  TempVar: string;
}

function isSevenEleven(form: any): form is sevenEleven {
  return (
    typeof form.storeid === "string" &&
    typeof form.storename === "string" &&
    typeof form.storeaddress === "string" &&
    typeof form.outside === "string" &&
    typeof form.ship === "string" &&
    typeof form.TempVar === "string"
  );
}
