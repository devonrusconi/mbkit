import React, { ReactElement, cloneElement, ReactNode, RefAttributes, forwardRef, FC, RefObject } from 'react';
import styles from './Table.scss';
import * as Lodash from 'lodash';
import { GlyphSortedDown, GlyphSortedUp, GlyphUnsorted } from '@mbkit/Icon';

export enum SortDirection {
    Ascending = 'Ascending',
    Descending = 'Descending',
    NoChange = 'NoChange',
}

export type TableProps = React.HTMLAttributes<HTMLDivElement> &
    RefAttributes<HTMLDivElement> & {
        headers: any[];
        records: any[];
        uniqueRecordKey: string;
        /** What the tipsy renders */
        /** What the screen reader will read in the event you use an icon */
        ariaLabel?: string;
    };
export const formatDate = (isoDateString: string, locale: string): string => {
    const date = new Date(isoDateString);
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
};
export interface ITableState {
    sortDirection: SortDirection;
    sortBy: string;
}
export interface ITableHeader {
    title: string;
    key: string;
    isSortable?: boolean;
    component?: (record: any, recordIndex: number) => React.ReactNode;
    centerHeader?: boolean;
    centerContent?: boolean;
    noTextWrap?: boolean;
}

export const Table: FC<TableProps> = forwardRef((props: TableProps, ref: RefObject<HTMLDivElement>) => {
    const { headers, uniqueRecordKey, records, className = '', style = {}, ...rest } = props;
    const [sortBy, setSortBy] = React.useState('');
    const [sortDirection, setSortDirection] = React.useState(SortDirection.NoChange);

    const sortedRecords = handleSortRecords(records, sortDirection, sortBy);

    function handleSort(header: string) {
        const nextSortTitleAndDirection = getNextTitleAndSortDirection(sortBy, header, sortDirection);

        setSortBy(nextSortTitleAndDirection.sortedBy);
        setSortDirection(nextSortTitleAndDirection.sortDirection);
    }

    function getNextTitleAndSortDirection(
        currentTitle: string,
        nextTitle: string,
        currentSortDirection: SortDirection,
    ) {
        const nextValues = {
            sortedBy: nextTitle,
            sortDirection: SortDirection.Ascending,
        };
        // If new title, set sort direction and title to new
        if (currentTitle !== nextTitle) {
            return nextValues;
        }

        if (currentSortDirection === SortDirection.Ascending) {
            return {
                ...nextValues,
                sortDirection: SortDirection.Descending,
            };
        }
        if (currentSortDirection === SortDirection.Descending) {
            return {
                ...nextValues,
                sortDirection: SortDirection.NoChange,
            };
        }

        return nextValues;
    }

    function handleSortRecords(records: any[], sortDirection: SortDirection, recordKey: string) {
        const clonedRecords = [...records];
        const sortedRecords = Lodash.sortBy(
            clonedRecords,
            [
                record =>
                    typeof (record[recordKey] || '') === 'string'
                        ? (record[recordKey] || '').toString().toLowerCase()
                        : record[recordKey],
            ],
            ['asc'],
        );

        if (sortDirection === SortDirection.Ascending) {
            return sortedRecords;
        }

        if (sortDirection === SortDirection.Descending) {
            return sortedRecords.reverse();
        }

        // else reset records
        return clonedRecords;
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr data-name="table-header-row">
                    {headers.map(header => {
                        const { title, isSortable, key, centerHeader } = header;

                        const isSorted = sortBy === key;
                        const isSortingAscending = isSorted && sortDirection === SortDirection.Ascending;
                        const isSortingDescending = isSorted && sortDirection === SortDirection.Descending;

                        return (
                            <th onClick={isSortable ? () => handleSort(key) : () => {}} key={key}>
                                <div
                                    className={`${styles.header} ${isSortable && styles.sortable} ${
                                        centerHeader ? styles.centerContent : ''
                                    }`}
                                >
                                    {title}
                                    {/* tslint:disable:strict-boolean-expressions */}
                                    {isSortable && ' '}
                                    {isSortable && !isSortingAscending && !isSortingDescending && (
                                        <GlyphUnsorted
                                            className={styles.sortNone}
                                            data-name="sort-none"
                                            width={'10px'}
                                        />
                                    )}
                                    {isSortingAscending && <GlyphSortedUp data-name="sort-ascending" />}
                                    {isSortingDescending && <GlyphSortedDown data-name="sort-descending" />}
                                </div>
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {sortedRecords.map((record, recordIndex) => {
                    return (
                        <tr key={record[uniqueRecordKey]} data-name="table-data-row">
                            {headers.map(header => {
                                const { key, component, centerContent, noTextWrap } = header;

                                if (component && typeof component === 'function') {
                                    {
                                        /* tslint:enable:strict-boolean-expressions */
                                    }
                                    return (
                                        <td key={key}>
                                            <div
                                                className={`${centerContent ? styles.centerContent : ''} ${
                                                    noTextWrap ? styles.noTextWrap : ''
                                                }`}
                                            >
                                                {component(record, recordIndex)}
                                            </div>
                                        </td>
                                    );
                                }

                                // otherwise spit out default value
                                return (
                                    <td key={key}>
                                        <div
                                            className={`${centerContent ? styles.centerContent : ''} ${
                                                noTextWrap ? styles.noTextWrap : ''
                                            }`}
                                        >
                                            {record[key]}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
});
Table.displayName = 'Table';
