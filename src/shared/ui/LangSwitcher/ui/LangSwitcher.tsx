import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LangSwitcher.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import { THEME_BUTTON } from 'shared/ui/Button/ui/Button';

interface LangSwitcherPropsI {
   className?: string;
}

export const LangSwitcher: React.FC<LangSwitcherPropsI> = ({
   className
}) => {

   const { t, i18n } = useTranslation();

   const toggleLanguage = () => {
      i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
   }

   return (
      <Button
         className={classNames(cls.langSwitcher, {}, [className])}
         theme={THEME_BUTTON.CLEAR}
         onClick={toggleLanguage}
      >
         {
            t('Язык')
         }
      </Button>
   )
}