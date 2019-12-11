import React, {
    FC,
    forwardRef,
    AllHTMLAttributes,
    HTMLProps,
    useContext,
    createContext,
    Fragment,
    ReactNode,
} from 'react';
import { AccordionContext } from './Accordion';
import nanoid from 'nanoid';

export type AccordionItemProps = AllHTMLAttributes<HTMLDivElement> &
    HTMLProps<HTMLDivElement> & {
        as?: ReactNode;
        /** Do not use "_index"! this is for internal usage of the accordion. Your value will be overwritten by the accordion */
        _index?: number;
    };

export const AccordionItemContext = createContext({ id: '', isExpanded: false, index: 0 });
export const AccordionItem: FC<AccordionItemProps> = forwardRef((props: AccordionItemProps, ref) => {
    const { as = Fragment as any, _index = 0, ...rest } = props;
    const { activePanes } = useContext(AccordionContext);
    const Component = as;

    const id = nanoid();
    const isExpanded = activePanes.includes(_index);

    return (
        <AccordionItemContext.Provider value={{ id, isExpanded, index: _index }}>
            <Component {...rest} ref={ref} />
        </AccordionItemContext.Provider>
    );
});
AccordionItem.displayName = 'AccordionItem';
