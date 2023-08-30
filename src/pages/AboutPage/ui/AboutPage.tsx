import React from 'react'
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
   const { t } = useTranslation('about');
   return (
      <div>
         {t('kot')}
         <div>
            {t('mysh-i-sobaka')} </div>
      </div>
   )
}

export default AboutPage;