import React, { AllHTMLAttributes, FC, forwardRef, RefObject, ReactNode, RefAttributes, useState } from 'react';
import { MultiSelect } from '../../Select/src/MultiSelect';
import { Calendar } from '../../Calendar/src/Calendar';
import { Input } from '../../Input/src/Input';
import styles from './DatePicker.scss';
import * as englishLocale from 'date-fns/locale/en-US';
import { getLocaleDateString } from '../../../shared/utils/localeDateString';
import { getDaysInMonth } from 'date-fns';
import { padStart } from 'lodash';

export type DatePickerProps = AllHTMLAttributes<HTMLDivElement> &
    RefAttributes<HTMLDivElement> & {
        /** When the modal is set to be displayed, the screen reader will read this to the assistive technology */
        label: string;
        /** Pass through of reach ui dialog overlay props */
        placeHolder?: string;
    };

export const DatePicker: FC<DatePickerProps> = forwardRef((props: DatePickerProps, ref: RefObject<HTMLDivElement>) => {
    const { className = '', ...rest } = props;
    const [show, setShow] = useState(false);

    function toggleCalendar() {}
    return (
        <div className={styles.datePicker}>
            <Input value={''} onClick={() => setShow(!show)} onChange={() => {}} />
            {show && <Calendar />}
        </div>
    );
});
DatePicker.displayName = 'DatePicker';
