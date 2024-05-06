import {RouteObject, createBrowserRouter} from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { ROUTES } from "./constants";
import { Home } from "../pages/Home";
import { Popular } from "../pages/Popular";
import { Rated } from "../pages/Rated";
import { Favorite } from "../pages/Favorite";
import { Playing } from "../pages/Playing";
import { Show } from "../pages/Show";

const routes: RouteObject[] = [
    {
        path: ROUTES.HOME,
        element: <PrivateRouter />,
        children: [
            {
                path: ROUTES.HOME,
                element: <Home />,
            },
            {
                path: ROUTES.POPULAR,
                element: <Popular />,
            },
            {
                path: ROUTES.RATED,
                element: <Rated />,
            },
            {
                path: ROUTES.PLAYING,
                element: <Playing />,
            },
            {
                path: ROUTES.FAVORITE,
                element: <Favorite />,
            },
            {
                path: `${ROUTES.SHOW}:id`,
                element: <Show />,
            },
        ],
    },
    {
        path: '/admin', element: <PublicRouter />,
        children: [
            {path: '/admin', element: <Home />}
        ]
    },
];

export const router = createBrowserRouter(routes);