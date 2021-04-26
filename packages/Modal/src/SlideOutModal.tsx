import React, { AllHTMLAttributes, FC, forwardRef, RefObject, ReactNode, RefAttributes } from 'react';
import { DialogOverlay, DialogContent, DialogOverlayProps } from '@reach/dialog';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import classnames from 'classnames';
import styles from './Modal.scss';

export type SlideoutModalProps = AllHTMLAttributes<HTMLDivElement> &
    RefAttributes<HTMLDivElement> & {
        /** Determines whether the modal is visible or not */
        show: boolean;
        /** When the close icon or background is clicked, this will be called */
        onClose: () => void;
        /** When the modal is set to be displayed, the screen reader will read this to the assistive technology */
        label: string;
        /** Sets max-width of modal from largest to smallest */
        size: 1 | 2 | 3;
        /** Props to be passed to the veil. Useful for custom styles or class names */
        veilProps?: AllHTMLAttributes<HTMLDivElement>;
        /** Adds header bar with content passed in it */
        header?: ReactNode;
        /** Adds footer */
        footer?: ReactNode;
        /** Set's initial focused item on passed in ref. Otherwise it will be focused on the first focusable item */
        initialFocusRef?: RefObject<any>;
        /** Pass through of reach ui dialog overlay props */
        reachDialogOverlayProps?: Partial<DialogOverlayProps>;
    };

type TransitionValues = {
    entering: object;
    entered: object;
    exiting: object;
    exited: object;
    unmounted?: object;
};

const veilTransitions: TransitionValues = {
    entering: {
        opacity: 0,
    },
    entered: {
        opacity: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    exiting: {
        opacity: 0,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    exited: {
        opacity: 0,
    },
};

const duration = Number(styles.transitionTime);
// TODO consume button and close icon
const CloseIcon = (props: any) => (
    <svg width="32" height="32" viewBox="0 0 32 32" tabIndex={0} {...props}>
        <defs>
            <path
                id="path-1-YCcq7N9hUYyFxWI-pg_o5"
                d="M7.6440993 7.64644661c.19526214-.19526215.51184463-.19526215.70710678 0L15.9986527 15.294l7.6477939-7.64755339c.1952622-.19526215.5118446-.19526215.7071068 0 .1952621.19526215.1952621.51184464 0 .70710678L16.7056527 16.001l7.6479007 7.6477938c.1735663.1735663.1928515.4429907.0578554.6378589l-.0578554.0692479c-.1952622.1952621-.5118446.1952621-.7071068 0L15.9986527 16.708l-7.64744662 7.6479006c-.19526215.1952621-.51184464.1952621-.70710678 0-.19526215-.1952622-.19526215-.5118447 0-.7071068L15.2916527 16.001 7.6440993 8.35355339c-.17356635-.17356635-.1928515-.44299075-.05785545-.63785889z"
            ></path>
        </defs>
        <g id="Icons/UI/Close-YCcq7N9hUYyFxWI-pg_o5" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <mask id="mask-2-YCcq7N9hUYyFxWI-pg_o5" fill="#fff">
                <use xlinkHref="#path-1-YCcq7N9hUYyFxWI-pg_o5"></use>
            </mask>
            <use id="Close-YCcq7N9hUYyFxWI-pg_o5" fill="#54575F" xlinkHref="#path-1-YCcq7N9hUYyFxWI-pg_o5"></use>
        </g>
    </svg>
);

export const SlideoutModal: FC<SlideoutModalProps> = forwardRef(
    (props: SlideoutModalProps, ref: RefObject<HTMLDivElement>) => {
        const {
            show,
            label,
            className = '',
            style = {},
            veilProps = {},
            onClose,
            header,
            children,
            footer,
            initialFocusRef,
            size,
            reachDialogOverlayProps,
            ...rest
        } = props;

        // Using own internal state that is ultimately derived from `show` prop because animations
        const [internalShow, setInternalShow] = React.useState(show);

        React.useEffect(() => {
            if (show) {
                setInternalShow(show);
            } else {
                const timeout = setTimeout(() => {
                    setInternalShow(show);
                }, duration);

                return () => {
                    clearTimeout(timeout);
                };
            }
        }, [show]);

        const classNames = classnames({
            [styles.modal]: true,
            [styles.slideOutModal]: true,
            [styles[`size${size}`]]: size,
            [className]: className,
        });
        const veilClassNames = classnames({
            [styles.veil]: true,
            [veilProps.className || '']: veilProps.className,
        });

        //Grabs the width of the container for slide out anamation
        var width = document.getElementById('modal-container')?.offsetWidth;
        const slideOutModalTransitions: TransitionValues = {
            entering: {
                opacity: 0,
                transform: 'translate3d(calc(' + width + 'px - 960px), 0, 0)',
            },
            entered: {
                opacity: 1,
                transform: 'translate3d(0,0,0)',
            },
            exiting: {
                opacity: 0,
                transform: 'translate3d(100%, 0, 0)',
            },
            exited: {
                opacity: 1,
                transform: 'translate3d(0, 0, 0)',
            },
        };

        return (
            <div id="modal-container">
                <Transition in={show} timeout={duration}>
                    {(state: TransitionStatus) => (
                        <DialogOverlay
                            isOpen={internalShow}
                            style={{ ...veilTransitions[state], ...veilProps.style }}
                            className={veilClassNames}
                            onDismiss={onClose}
                            initialFocusRef={initialFocusRef}
                            {...reachDialogOverlayProps}
                        >
                            <DialogContent
                                {...(rest as any)}
                                aria-label={label}
                                style={{ ...slideOutModalTransitions[state], ...style }}
                                className={classNames}
                                ref={ref}
                            >
                                {header ? (
                                    <header className={styles.header}>
                                        {header} <CloseIcon className={styles.closeIcon} onClick={onClose} />
                                    </header>
                                ) : (
                                    <CloseIcon className={styles.closeIcon} onClick={onClose} />
                                )}
                                <main className={styles.content}>{children}</main>
                                {footer && <footer className={styles.footer}>{footer}</footer>}
                            </DialogContent>
                        </DialogOverlay>
                    )}
                </Transition>
            </div>
        );
    },
);
SlideoutModal.displayName = 'SlideoutModal';
