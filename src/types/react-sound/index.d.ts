import * as React from "react";

export interface OnPlayingParam {
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
    onLoading?: () => void;
    onLoad?: () => void;
    onPlaying?: (params: OnPlayingParam) => void;
    onPause?: () => void;
    onResume?: () => void;
    onStop?: () => void;
    onFinishedPlaying?: () => void;
    onBufferChange?: () => void;
}

declare const ReactSound: React.ComponentClass<ReactSoundProps>;

export default ReactSound;
