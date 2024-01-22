import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from './providers/ThemeProvider';

// ? Корневой компонент;
const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    // ? Отрисовываем AppRouter после инициализации авторизационных данных;
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {
                        inited
                            ? <AppRouter />
                            : null
                    }
                </div>
            </Suspense>
        </div>
    );
};

export default App;
