import { NavLink, NavLinkRenderProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Menu = ({ menus }: any) => {
  const currentPage = ({ isActive }: NavLinkRenderProps) => {
    let className = "p-2 block";

    if (isActive) {
      className += twMerge(className, "bg-primary text-white rounded-md");
    }

    return className;
  };

  return (
    <ul className="flex flex-col gap-1">
      {menus.map((menu: any) => (
        <li key={menu.name}>
          <NavLink
            to={menu.link}
            className={currentPage}
          >
            {menu.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
