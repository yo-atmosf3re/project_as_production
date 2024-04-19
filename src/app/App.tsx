import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { AppRouter } from './providers/router';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';

// ? Корневой компонент;
const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    // ? Отрисовываем AppRouter после инициализации авторизационных данных;
    const inited = useSelector(getUserInited);

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    console.log(getAllFeatureFlags().isAppRedesigned, 'redesigned');

    if (!inited) {
        return <PageLoader />;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div
                    id="app"
                    className={classNames('app', {}, [theme])}
                >
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
            on={
                <div
                    id="app"
                    className={classNames('app_redesigned', {}, [theme])}
                >
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                        />
                    </Suspense>
                </div>
            }
        />
    );
};

export default App;
