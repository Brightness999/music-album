declare module 'react-text-marquee' {    
    interface IProps {
        text: string,
        hoverToStop?: bool,
        loop?: bool,
        leading?: number,
        trailing?: number,
        className?: string
    }
    function Marquee(props: IProps): JSX.Element;

    export = Marquee;
}
