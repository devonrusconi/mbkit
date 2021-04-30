import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import { Table } from '../index';
import { data, getHeaders } from './TestData';

describe('Table', () => {
    it('should render the content passed in as children', () => {
        const { getByText } = render(
            <Table data-testid={'Test'} records={data} headers={getHeaders()} uniqueRecordKey="test-key" />,
        );

        expect(getByText('Test')).not.toBe(null);
        expect(getByText('Test').nodeName).toBe('TABLE');
    });
});
