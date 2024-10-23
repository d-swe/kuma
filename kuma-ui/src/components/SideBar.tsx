import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuItem,
	NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsBoxes, BsBoxSeam, BsHouseDoor } from "react-icons/bs";
import { MdOutlineInventory2 } from "react-icons/md";
import { AiOutlineAppstore } from "react-icons/ai";

export const SideBar = () => {
	const [activeTab, setActiveTable] = useState("/");
	const navigate = useNavigate();

	const menuItems: { name: string; icon: ReactNode; nav: string }[] = [
		{
			name: "Landing",
			icon: <BsHouseDoor />,
			nav: "/",
		},
		{
			name: "Warehouse",
			icon: <BsBoxes />,
			nav: "/warehouse",
		},
		{
			name: "Inventory",
			icon: <MdOutlineInventory2 />,
			nav: "/inventory",
		},
		{
			name: "Product",
			icon: <BsBoxSeam />,
			nav: "/product",
		},
		{
			name: "Order",
			icon: <HiOutlineShoppingBag />,
			nav: "/order",
		},
		{
			name: "Customer",
			icon: <IoPersonOutline />,
			nav: "/customer",
		},
		{
			name: "Category",
			icon: <AiOutlineAppstore />,
			nav: "/category",
		},
	];

	const handleNavigation = (path: string) => {
		setActiveTable(path);
		navigate(path);
	};

	return (
		<NavigationMenu className="p-[20px]">
			<NavigationMenuList className="cursor-pointer flex flex-col gap-2">
				{menuItems.map((menuItem, index) => (
					<NavigationMenuItem
						key={index}
						className={`${
							activeTab === menuItem.nav ? "bg-gray-100 text-black !text-black" : ""
						} rounded-md w-[200px] pl-[12px] pr-[30px] py-[5px] text-white hover:bg-gray-100 hover:text-black`}
						onClick={() => handleNavigation(`${menuItem.nav}`)}
					>
						<NavigationMenuLink className="flex flex-row items-center justify-left gap-2">
							{menuItem.icon}
							<span>{menuItem.name}</span>
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
