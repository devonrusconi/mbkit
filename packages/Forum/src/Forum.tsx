/* eslint react/prop-types: 0 */
import React, {
    forwardRef,
    FC,
    RefObject,
    InputHTMLAttributes,
    ReactNode,
    RefAttributes,
    ComponentClass,
    SFC,
} from 'react';
import styles from './Forum.scss';
import { IconInformation } from '@mbkit/Icon';
import { Tipsy } from '@mbkit/tipsy';
import _uniqueId from 'lodash/uniqueId';

function getUniqueId(): string {
    return _uniqueId();
}

export type ForumProps = InputHTMLAttributes<HTMLInputElement> &
    RefAttributes<HTMLInputElement> & {
        /** Value that is displayed in text input */
        labelText?: string;
        /** Fires when user interacts with value in input field */
        className?: string;
        /** Add text or icon here which shows as in front of the input field */
        tipsyText?: string;
        /** Props to be added to wrapper container of the input field */
        childIdTargetType?: string | ComponentClass<any> | SFC<any>;
        /** Adds red border and sets aria-invalid attribute */
        childId?: string;
    };
export const Forum: FC<ForumProps> = forwardRef((props: ForumProps, ref: RefObject<HTMLInputElement>) => {
    const renderLabel = (htmlFor: string) => {
        return (
            <label className={`${styles.label}`} htmlFor={htmlFor}>
                <span className={styles.labelText}>{props.labelText}</span>
                {props.tipsyText && (
                    <Tipsy label={props.tipsyText}>
                        <span>
                            <IconInformation />
                        </span>
                    </Tipsy>
                )}
            </label>
        );
    };

    const isChildIdTarget = (child: ReactNode, index: number) => {
        const { childIdTargetType, childId } = props;

        if (childIdTargetType != null) {
            if (React.isValidElement(child)) {
                return child.type === childIdTargetType;
            }
        }

        if (childId != null) {
            return false;
        }

        // default to using index 0
        return index === 0;
    };

    const getTargetChildId = (children: ReactNode) => {
        let childId = props.childId != null ? props.childId : getUniqueId();

        React.Children.forEach(children, (child: any, index: any) => {
            if (isChildIdTarget(child, index)) {
                if (React.isValidElement(child)) {
                    const existingChildIdProp = child.props['id'];
                    // if there is already an ID on this child...
                    if (existingChildIdProp != null) {
                        // use that one
                        childId = child.props['id'];
                    }
                }
            }
        });

        return childId;
    };

    const updateTargetChildIdIfNeeded = (children: ReactNode, childId: string) => {
        return React.Children.map(props.children, (child: any, index: any) => {
            if (isChildIdTarget(child, index)) {
                if (React.isValidElement(child)) {
                    const existingChildIdProp = child.props['id'];
                    if (existingChildIdProp == null) {
                        return React.cloneElement<any>(child, {
                            id: childId,
                        });
                    }
                }
            }

            return child;
        });
    };

    let label = null;
    let children = props.children;

    if (props.labelText != null && props.labelText.length !== 0) {
        const childId = getTargetChildId(children);
        children = updateTargetChildIdIfNeeded(children, childId);
        label = renderLabel(childId);
    }

    return (
        <fieldset className={`${styles.fieldset} ${props.className || ''}`}>
            {label}
            {children}
        </fieldset>
    );
});
Forum.displayName = 'Forum';
