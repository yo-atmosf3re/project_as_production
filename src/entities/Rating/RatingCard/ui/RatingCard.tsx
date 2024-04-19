import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
    BUTTON_SIZE,
    BUTTON_THEME,
    Button as ButtonDeprecated,
} from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

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
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <>
                        <Text title={feedbackTitle} />
                        <Input
                            placeholder={t('Ваш отзыв')}
                            value={feedback}
                            onChange={setFeedback}
                            data-testid="RatingCard.Input"
                        />
                    </>
                }
                off={
                    <>
                        <TextDeprecated title={feedbackTitle} />
                        <InputDeprecated
                            placeholder={t('Ваш отзыв')}
                            value={feedback}
                            onChange={setFeedback}
                            data-testid="RatingCard.Input"
                        />
                    </>
                }
            />
        );

        const mainContent = (
            <>
                <VStack
                    align="center"
                    gap="8"
                    max
                >
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={
                            <Text
                                title={
                                    starsCount ? t('Спасибо за оценку!') : title
                                }
                            />
                        }
                        off={
                            <TextDeprecated
                                title={
                                    starsCount ? t('Спасибо за оценку!') : title
                                }
                            />
                        }
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
                            <ToggleFeatures
                                feature="isAppRedesigned"
                                on={
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
                                            data-testid="RatingCard.Closed"
                                        >
                                            {t('Закрыть')}
                                        </Button>
                                    </HStack>
                                }
                                off={
                                    <HStack
                                        justify="between"
                                        max
                                    >
                                        <ButtonDeprecated
                                            onClick={onClickAcceptHandler}
                                            data-testid="RatingCard.Send"
                                        >
                                            {t('Отправить')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            onClick={onClickCancelHandler}
                                            theme={BUTTON_THEME.OUTLINE_RED}
                                            data-testid="RatingCard.Closed"
                                        >
                                            {t('Закрыть')}
                                        </ButtonDeprecated>
                                    </HStack>
                                }
                            />
                        </VStack>
                    </Modal>
                </BrowserView>
                <MobileView>
                    <Drawer
                        isOpen={isModalOpen}
                        onClose={onClickCancelHandler}
                    >
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={
                                <VStack gap="32">
                                    {modalContent}
                                    <Button
                                        onClick={onClickAcceptHandler}
                                        size="l"
                                        fullWidth
                                    >
                                        {t('Отправить')}
                                    </Button>
                                </VStack>
                            }
                            off={
                                <VStack gap="32">
                                    {modalContent}
                                    <ButtonDeprecated
                                        onClick={onClickAcceptHandler}
                                        size={BUTTON_SIZE.L}
                                        fullWidth
                                    >
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                </VStack>
                            }
                        />
                    </Drawer>
                </MobileView>
            </>
        );

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card
                        border="partial"
                        max
                        padding="24"
                        data-testid="RatingCard"
                    >
                        {mainContent}
                    </Card>
                }
                off={
                    <CardDeprecated
                        className={classNames(cls['rating-card'], {}, [
                            className,
                        ])}
                        max
                        data-testid="RatingCard"
                    >
                        {mainContent}
                    </CardDeprecated>
                }
            />
        );
    },
);
