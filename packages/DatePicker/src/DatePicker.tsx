import React, { FC, forwardRef, RefObject, RefAttributes, useState } from 'react';
import { Calendar, ICalendarProps } from '../../Calendar/src/Calendar';
import { Input } from '../../Input/src/Input';
import styles from './DatePicker.scss';
import classnames from 'classnames';

export type DatePickerProps = ICalendarProps & {
    /** When the modal is set to be displayed, the screen reader will read this to the assistive technology */
    label: string;
    /** Pass through of reach ui dialog overlay props */
    placeHolder?: string;
};

export const DatePicker: FC<DatePickerProps> = forwardRef((props: DatePickerProps, ref: RefObject<HTMLDivElement>) => {
    const { className = '', placeHolder = '', ...rest } = props;
    const [show, setShow] = useState(false);
    const [date, setDate] = useState('');
    const showPlaceholder = date === '';

    const classNames = classnames({
        [styles.placeHolder]: showPlaceholder,
        [className]: className,
    });

    function toggleCalendar(date: any) {
        setDate(date);
        setShow(false);
    }
    return (
        <div {...rest} className={styles.datePicker}>
            <Input
                value={showPlaceholder ? placeHolder : new Date(date).toDateString()}
                onClick={() => setShow(!show)}
                onChange={() => {}}
                className={classNames}
            />
            {show && <Calendar {...rest} onChange={(date: any) => toggleCalendar(date)} />}
        </div>
    );
});
DatePicker.displayName = 'DatePicker';
