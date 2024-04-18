import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlags, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from '@/entities/User';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface UiDesignSwitcherPropsI {
    className?: string;
}

/**
 *
 * @param className
 */
export const UiDesignSwitcher: React.FC<UiDesignSwitcherPropsI> = memo(
    ({ className }) => {
        const { t } = useTranslation();

        const [isLoading, setIsLoading] = useState<boolean>(false);
        const dispatch = useAppDispatch();
        const authData = useSelector(getUserAuthData);

        const isAppRedesigned = getFeatureFlags('isAppRedesigned');

        const items = [
            {
                content: t('Новый'),
                value: 'new',
            },
            {
                content: t('Старый'),
                value: 'old',
            },
        ];

        const onChangeHandler = async (value: string) => {
            if (authData) {
                setIsLoading(true);
                await dispatch(
                    updateFeatureFlag({
                        userId: authData?.id,
                        newFeatures: {
                            isAppRedesigned: value === 'new',
                        },
                    }),
                ).unwrap();
                setIsLoading(false);
            }
        };

        return (
            <VStack gap="8">
                <Text text={t('Вариант интерфейса')} />
                {isLoading ? (
                    <Skeleton
                        width={113}
                        height={32}
                        border="32px"
                    />
                ) : (
                    <ListBox
                        className={classNames('', {}, [className])}
                        value={isAppRedesigned ? 'new' : 'old'}
                        items={items}
                        onChange={onChangeHandler}
                    />
                )}
            </VStack>
        );
    },
);
