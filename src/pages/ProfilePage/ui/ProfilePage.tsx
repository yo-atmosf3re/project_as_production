import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { Page } from 'widgets/Page';
import { VStack } from 'shared/ui/Stack';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text';
import cls from './ProfilePage.module.scss';
import { ProfilePageHeader } from './ProfilePageHeader';

interface ProfilePagePropsI {
    className?: string;
}

// const INITIAL_REDUCERS: ReducersList = {
//     profile: profileReducer,
// };

/**
 * Содержит в себе отрисовку страницы профиля: карточки пользователя/пользователей, заголовок страницы, логику по взаимодействию пользователя со страницей профиля;
 * @param className
 */
const ProfilePage: React.FC<ProfilePagePropsI> = ({
    className,
}) => {
    const { t } = useTranslation('profile');
    const { id } = useParams<{id: string}>();

    if (!id) {
        return (
            <Text
                title={
                    t('Профиль не найден')
                }
            />
        );
    }

    return (
        // <DynamicModuleLoader
        //     reducers={INITIAL_REDUCERS}
        // >
        <Page className={classNames(cls.profile, {}, [className])}>
            <VStack
                max
                gap="16"
            >
                <ProfilePageHeader />
                <EditableProfileCard
                    id={id}
                />
            </VStack>
        </Page>
        // </DynamicModuleLoader>
    );
};

export default ProfilePage;
