import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

/**
 * @param Gesture - типы библиотеки `gesture`;
 * @param Sptring - типы библиотеки `react-spring`;
 * @param isLoaded - когда `true`, означает, что библиотеки уже подгрузились, а `false` - не подгрузились (для отрисовки лоудеров);
 */
interface AnimationContextPayloadI {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayloadI>({});

// ? Используем асинхронный импорт - он работает с промисами, отличается от импорта вверху компоненты тем, что верхний используется только в начале файла, а такой импорт можно использовать в компонентах, функциях и так далее;
const getAsyncAnimationModules = () => {
    // ? Т.к на проекте обе библиотеки завясят друг от друга и используются вместе, то с помощью стандартного метода all у Promise дожидаемся загрузки библиотек параллельно;
    return Promise.all([
        import('@react-spring/web'),
        import('@use-gesture/react'),
    ]);
};

/**
 * Кастомный хук для упрощённого получения данных от `AnimationContext`, потому что данный хук возвращает результат выполнения `useContext` с переданным внутрь `AnimationContext`;
 * @returns AnimationContext-data
 */
export const useAnimationLibs = () => {
    // ? Типизируем аргумент таким образом, чтобы после каждого использования хука не делать проверки на undefined, потому что в интерфейсе AnimationContextPayloadI поля Sptring, Gesture могут быть не обязательным, а с помощью такого каста Typescript перестаёт требовать подобных проверок каждый раз, потому что утилита Required указывает на каждое свойство в T как на обязательное и всегда имеющееся в наличии (non-nullable);
    return useContext(AnimationContext) as Required<AnimationContextPayloadI>;
};

// ? Расположение данного провайдера в shared слое обусловлено тем, что данный провайдер может быть использован в любом месте приложения - там где нужен доступ к тем библиотекам, которые использует этот самый провайдер. Вес данных библиотек достаточно велик для того, чтобы добавлять их в основной бандл в продакшен-сборку без ленивой подгрузки;
/**
 * Провайдер для компонент, которым требуется доступ к библиотекам (библиотеки для работы с анимациями), подгружаемые лениво из-за большого веса этих библиотек;
 * @param children
 * @returns
 */
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    // ? Рефы в данном случае нужны для того, чтобы можно было лёгкий доступ к значениям из библиотек без перерисовок. В момент завершения ленивой загрузки, в данных рефах, по-сути, будут хранится сами библиотеки;
    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();

    // ? Инициализация isLoaded, и в данном случае - false это состояние, при котором загрузка библиотеки ещё не началась;
    const [isLoaded, setIsLoaded] = useState(false);

    // ? Внутри useEffect вызывается функция, при успешном выполнении которой, зарезолвленные данные сохраняются в рефы, т.е тем самым получаются данные по библиотекам получаются, передаются в рефы;
    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring;
            GestureRef.current = Gesture;
            // ? Сигнализируем о том, что библиотеки подгрузились успешно;
            setIsLoaded(true);
        });
    }, []);

    // ? Для того, чтобы исключить пересоздание объекта value при перерисовках, мемоизируем сам объект;
    const value = useMemo(
        () => ({
            Gesture: GestureRef.current,
            Spring: SpringRef.current,
            isLoaded,
        }),
        [isLoaded],
    );

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};
