import React from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/ListBox';
import { HStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page';

/**
 * Компонента, которая является главной страницей;
 */
const MainPage = () => {
    const { t } = useTranslation('main');

    return (
        <Page>
            {
                t('Главная страница')
            }
            <div>111</div>
            <div>222</div>
            <HStack>
                <div>333</div>
                <ListBox
                    defaultValue="Выберите значение"
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onChange={(value: string) => {}}
                    value={undefined}
                    items={[
                        { value: '111', content: '222' },
                        { value: '222', content: '333', disabled: true },
                        { value: '333', content: '444' },
                    ]}
                />
            </HStack>
            <div>444</div>
            <div>555</div>
            <div>666</div>
        </Page>
    );
};

export default MainPage;
