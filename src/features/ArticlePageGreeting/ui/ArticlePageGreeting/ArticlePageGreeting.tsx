import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation('article');
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlesPageWasOpened } = useJsonSettings();
    const dispatch = useAppDispatch();

    // ? Если страница со статьями ещё не была открыта первый раз, то срабатывает этот эффект, который открывает модальное окно с приветствием и меняет jsonSettings-флаг. Таким образом, компонента с приветствием отрисуется для конкретного пользователя только один раз;
    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            setIsOpen(true);
            dispatch(
                saveJsonSettings({
                    isArticlesPageWasOpened: true,
                }),
            );
        }
    }, [dispatch, isArticlesPageWasOpened]);

    const onClose = () => setIsOpen(false);

    const text = (
        <Text
            title={t('Добро пожаловать на страницу статей!')}
            text={t(
                'Здесь Вы можете искать и просматривать статьи на различные темы.',
            )}
        />
    );

    if (isMobile) {
        return (
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
            >
                {text}
            </Drawer>
        );
    }

    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onClose}
        >
            {text}
        </Modal>
    );
});
