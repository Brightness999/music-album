declare module 'react-top-loading-bar' {
    interface LoadingBarProps {
        progress: number;
        height: number;
        color: string;
        onLoaderFinished: ()=>void;
    }
    function ReactLoadingBar(props: LoadingBarProps): JSX.Element;

    export = ReactLoadingBar;
}
