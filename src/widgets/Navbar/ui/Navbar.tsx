/* eslint-disable max-len, i18next/no-literal-string, @typescript-eslint/no-unused-vars */
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal';
import { Button } from 'shared/ui/Button';
import { BUTTON_THEME } from 'shared/ui/Button/ui/Button';
import cls from './Navbar.module.scss';

interface NavbarPropsI {
   className?: string;
}

// ? Компонента-навбар;
export const Navbar: React.FC<NavbarPropsI> = ({
    className,
}) => {
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = React.useState(false);

    const onToggleModal = React.useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.navbar)}>
            <Button
                className={cls.links}
                theme={BUTTON_THEME.CLEAR_INVERTED}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>
            <Modal
                isOpen={isAuthModal}
                onClose={onToggleModal}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eligendi architecto nisi minus aspernatur nemo culpa ipsa. Aliquid consequatur at sequi pariatur obcaecati vero debitis dolorem tenetur quam voluptatum necessitatibus quaerat alias eligendi corporis, aliquam quasi repellendus, ducimus, laboriosam architecto beatae impedit labore? A, cum quia quaerat recusandae rerum unde incidunt blanditiis laborum facilis sequi eius cumque officia quo, quibusdam beatae in nam ullam magni maiores odit vitae quas. Voluptatum consectetur ut soluta eum laudantium, distinctio libero consequatur inventore laboriosam maiores odit beatae a eligendi deserunt sit repellendus id asperiores reiciendis nam odio natus porro. Quas, dignissimos? Adipisci, beatae rem.
            </Modal>
        </div>
    );
};
