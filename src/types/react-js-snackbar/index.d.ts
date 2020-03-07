// Type definitions for react-sound 1.2
// Project: https://github.com/leoasis/react-sound
// Definitions by: Konstantin Lebedev <https://github.com/koss-lebedev>
//                 Paito Anderson <https://github.com/PaitoAnderson>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare module 'react-js-snackbar' {
    import * as React from 'react';

    export interface SnackbarProps {
        Show: boolean;
    }
    declare const ReactSnackBar: React.ComponentClass<SnackbarProps>;

    export default ReactSnackBar;
}
