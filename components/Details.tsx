import {FloatingArrow, useFloating, arrow} from '@floating-ui/react';
import { useRef } from 'react';


const Details = () => {
    
    const arrowRef = useRef(null);
    const {refs, floatingStyles, context} = useFloating({
        middleware: [arrow({element: arrowRef.current,}),],
    });
    return (
        <div>
        <h1>Details</h1>
        </div>
    );
}
