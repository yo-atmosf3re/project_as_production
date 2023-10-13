import React from 'react';
import { ROUTES_PATH } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-us.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: ROUTES_PATH.main,
        Icon: MainIcon,
        text: 'Главная',
    },
    {
        path: ROUTES_PATH.about,
        Icon: AboutIcon,
        text: 'О сайте',
    },
    {
        path: ROUTES_PATH.profile,
        Icon: ProfileIcon,
        text: 'Профиль',
    },
];
