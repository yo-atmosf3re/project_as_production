import React from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ProfilePage.module.scss';

interface ProfilePagePropsI {
    className?: string;
}

/**
 * Содержит в себе отрисовку страницы профиля: карточки пользователя/пользователей, заголовок страницы, логику по взаимодействию пользователя со страницей профиля (всё это декомпозировано в EditableProfileCard);
 * @param className
 */
const ProfilePage: React.FC<ProfilePagePropsI> = ({ className }) => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }
    return (
        <Page
            data-testid="ProfilePage"
            className={classNames(cls.profile, {}, [className])}
        >
            <VStack
                max
                gap="16"
            >
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
