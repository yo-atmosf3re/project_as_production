import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { StarRating } from '@/shared/ui/StarRating';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { BUTTON_SIZE, BUTTON_THEME, Button } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';

interface RatingCardPropsI {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

/**
 * Компонента, отрисовывающая локальную логику по отрисовке рейтинга и взаимодействия с ним. Содержит внутри себя локальный стейт, а всё взаимодействие с данной компонентой будет производится посредством использования двух коллбэков - `onCancel`, `onAccept`. Использование данной компоненты предполагается в вышестоящих слоях, например - `features`;
 * @param className
 * @param title - основной заголовок;
 * @param feedbackTitle - заголовок внутри модального окна, в котором пользователь будет отправлять отзыв;
 * @param hasFeedback - флаг, на котором основывается дальнейшее поведение компоненты: нужно ли пользователю оставлять отзыв и рейтинг или поставить рейтинг;
 * @param onCancel - кнопка отмены отзыва;
 * @param onAccept - кнопка отправки отзыва (отправка текста отзыва и рейтинга);
 * @param rate - количество звёзд, которое выбрал пользователь (отображается либо в состоянии выбора, либо отображает уже сделанный выбор);
 */
export const RatingCard: React.FC<RatingCardPropsI> = memo(
    ({
        className,
        feedbackTitle,
        hasFeedback,
        onAccept,
        onCancel,
        title,
        rate = 0,
    }) => {
        const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
        const [starsCount, setStarsCount] = useState<number>(rate);
        const [feedback, setFeedback] = useState<string>('');

        const { t } = useTranslation('ratingCard');

        // ? Если есть/нужен фидбек, то открываем модальное окно, иначе сразу отправляем количество звёзд без фидбека, которое выбрал пользователь без открытия модального окна;
        const onSelectStars = useCallback(
            (selectedStarsCount: number) => {
                setStarsCount(selectedStarsCount);
                if (hasFeedback) {
                    setIsModalOpen(true);
                } else {
                    onAccept?.(selectedStarsCount);
                }
            },
            [hasFeedback, onAccept],
        );

        // ? При нажатии "Отправить" отрабатывает коллбэк с отправкой фидбека и рейтинга;
        const onClickAcceptHandler = useCallback(() => {
            setIsModalOpen(false);
            onAccept?.(starsCount, feedback);
        }, [feedback, onAccept, starsCount]);

        // ? При нажатии "Отправить" отрабатывает коллбэк с отправкой только фидбека;
        const onClickCancelHandler = useCallback(() => {
            setIsModalOpen(false);
            onCancel?.(starsCount);
        }, [onCancel, starsCount]);

        // ? Для будущих концептуальных доработок, часть похожей вёрстки вынесено в отдельную переменную;
        const modalContent = (
            <>
                <Text title={feedbackTitle} />
                <Input
                    placeholder={t('Ваш отзыв')}
                    value={feedback}
                    onChange={setFeedback}
                    data-testid="RatingCard.Input"
                />
            </>
        );

        return (
            <Card
                className={classNames(cls['rating-card'], {}, [className])}
                max
                data-testid="RatingCard"
            >
                <VStack
                    align="center"
                    gap="8"
                    max
                >
                    <Text
                        title={starsCount ? t('Спасибо за оценку!') : title}
                    />
                    <StarRating
                        size={40}
                        selectedStars={starsCount}
                        onSelect={onSelectStars}
                    />
                </VStack>
                <BrowserView>
                    <Modal
                        isOpen={isModalOpen}
                        lazy
                    >
                        <VStack
                            max
                            gap="32"
                        >
                            {modalContent}
                            <HStack
                                justify="between"
                                max
                            >
                                <Button
                                    onClick={onClickAcceptHandler}
                                    data-testid="RatingCard.Send"
                                >
                                    {t('Отправить')}
                                </Button>
                                <Button
                                    onClick={onClickCancelHandler}
                                    theme={BUTTON_THEME.OUTLINE_RED}
                                    data-testid="RatingCard.Closed"
                                >
                                    {t('Закрыть')}
                                </Button>
                            </HStack>
                        </VStack>
                    </Modal>
                </BrowserView>
                <MobileView>
                    <Drawer
                        isOpen={isModalOpen}
                        onClose={onClickCancelHandler}
                    >
                        <VStack gap="32">
                            {modalContent}
                            <Button
                                onClick={onClickAcceptHandler}
                                size={BUTTON_SIZE.L}
                                fullWidth
                            >
                                {t('Отправить')}
                            </Button>
                        </VStack>
                    </Drawer>
                </MobileView>
            </Card>
        );
    },
);
