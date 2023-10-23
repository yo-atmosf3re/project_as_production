import { classNames } from 'shared/lib/classNames/classNames';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entitites/User';
import { useTheme } from './providers/ThemeProvider';

// ? Корневой компонент;
const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
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
                        // inited
                        //     ? <AppRouter />
                        //     : null
                    }
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};

export default App;
