import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { UiDesignSwitcher } from '@/features/UiDesignSwitcher';

interface SettignsPagePropsI {
    className?: string;
}

/**
 *
 * @param className
 */
const SettignsPage: React.FC<SettignsPagePropsI> = memo(({ className }) => {
    const { t } = useTranslation();
    return (
        <Page className={classNames('', {}, [className])}>
            <VStack gap="16">
                <Text title={t('Настройки пользователя')} />
                <UiDesignSwitcher />
            </VStack>
        </Page>
    );
});

export default SettignsPage;
