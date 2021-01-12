/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Payment from "@material-ui/icons/Payment";
import Send from "@material-ui/icons/Send";
import Account from "@material-ui/icons/AccountBalance";
// core components/views for Admin layout
import UserProfile from "views/UserProfile/UserProfile.js";
import History from "views/History/History.js";
import Accounts from "views/Accounts/Accounts.js";
import Transfer from "views/Transfer/Transfer.js";
import CreditCards from "views/CreditCards/CreditCards.js";

const dashboardRoutes = [
  {
    path: "/accounts",
    name: "Accounts",
    icon: Account,
    component: Accounts,
    layout: "/dashboard",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/dashboard",
  },
  {
    path: "/table",
    name: "Transaction History",
    icon: "content_paste",
    component: History,
    layout: "/dashboard",
  },
  {
    path: "/transfer",
    name: "Cash Transfer",
    icon: Send,
    component: Transfer,
    layout: "/dashboard",
  },
  {
    path: "/cards",
    name: "Credit Cards",
    icon: Payment,
    component: CreditCards,
    layout: "/dashboard",
  },
];

export default dashboardRoutes;
