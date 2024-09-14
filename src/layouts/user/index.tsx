
import Menu from "@/components/layout/Menu";
import Profile from "@/components/layout/Profile";
import { Outlet } from "react-router-dom";
import { createMenu } from "./utils";

const User = () => {
  const menus = createMenu();

  return (
    <div className="flex bg-lilac min-h-screen">
      <div className="flex flex-col justify-between gap-5 p-5 w-[250px]">
        <div className="flex flex-col gap-5">
          <div>
            <img
              src="/assets/img/logo.png"
              width={120}
            />
          </div>

          <Menu menus={menus} />
        </div>

        <Profile />
      </div>

      <div className="px-8 py-5 flex-1 bg-[#f0eff6]">
        <Outlet />
      </div>
    </div>
  );
};

export default User;
