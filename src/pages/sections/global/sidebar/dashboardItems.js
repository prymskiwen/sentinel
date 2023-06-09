import {
  AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon,
  MonetizationOnOutlined as MonetizationOnOutlinedIcon,
  StorefrontOutlined as StorefrontOutlinedIcon,
  Inventory2Outlined as Inventory2OutlinedIcon,
} from "@mui/icons-material";

const pagesSection = [
  {
    slug: "sales",
    href: "/sales",
    icon: MonetizationOnOutlinedIcon,
    title: "Sales",
  },
  {
    slug: "brands",
    href: "/brands",
    icon: StorefrontOutlinedIcon,
    title: "Brands",
  },
  {
    slug: "inventory",
    href: "/inventory",
    icon: Inventory2OutlinedIcon,
    title: "Inventory",
  },
  {
    slug: "accounting",
    href: "/accounting",
    icon: AccountBalanceWalletOutlinedIcon,
    title: "Accounting",
  },
];

const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
];

export default navItems;
