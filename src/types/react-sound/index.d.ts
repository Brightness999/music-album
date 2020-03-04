// Type definitions for react-sound 1.2
// Project: https://github.com/leoasis/react-sound
// Definitions by: Konstantin Lebedev <https://github.com/koss-lebedev>
//                 Paito Anderson <https://github.com/PaitoAnderson>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare module 'react-sound' {
    import * as React from "react";

    export interface OnPlayingParams {
        position: number;
        duration: number;
    }

    export interface ReactSoundProps {
        url: string;
        playStatus: 'PLAYING' | 'STOPPED' | 'PAUSED';
        playFromPosition?: number;
        position?: number;
        volume?: number;
        playbackRate?: number;
        autoLoad?: boolean;
        loop?: boolean;
        onError?: () => void;
        onLoading?: (aa: boolean) => void;
        onLoad?: () => void;
        onPlaying?: (params: OnPlayingParams) => void;
        onPause?: () => void;
        onResume?: () => void;
        onStop?: () => void;
        onFinishedPlaying?: () => void;
        onBufferChange?: () => void;
    }

    declare const ReactSound: React.ComponentClass<ReactSoundProps>;

    export default ReactSound;
}