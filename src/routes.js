import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import NoPanel from "./layouts/NoPanel";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import UserLogin from "./views/UserLogin";
import Keluarga from "./views/Keluarga.js"
import AnggotaKeluarga from "./views/AnggotaKeluarga.js"
import TambahKKJikaTidakAda from "./views/TambahKKJikaTidakAda.js"
import UpdateGroup from "./views/UpdateGroup.js"

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/blog-overview" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {
    path: "/user/login",
    layout: NoPanel,
    component: UserLogin
  },
  // {
  //   path: "/admin/keluarga/:param_1/:param_2",
  //   layout: DefaultLayout,
  //   component: Keluarga
  // },
  {
    path: "/admin/keluarga",
    layout: DefaultLayout,
    component: Keluarga
  },
  // {
  //   path: "/admin/anggota-keluarga/:param_1/:param_2",
  //   layout: DefaultLayout,
  //   component: AnggotaKeluarga
  // },
  {
    path: "/admin/anggota-keluarga",
    layout: DefaultLayout,
    component: AnggotaKeluarga
  },
  // {
  //   path: "/admin/tambah-kk-jika-tidak-ada",
  //   layout: NoPanel,
  //   component: TambahKKJikaTidakAda
  // },
  {
    path: "/admin/update-group",
    layout: NoPanel,
    component: UpdateGroup
  },
  
];
