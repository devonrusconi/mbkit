import React from 'react';
import Markdown from 'markdown-to-jsx';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import theme from 'prism-react-renderer/themes/vsDark';
import styles from './MarkdownWithOverrides.module.scss';

const CodeEditorPreview = props => {
    return (
        <div className={styles.codeEditorWrapper}>
            <LiveProvider code={props.children} scope={props.scope} theme={theme}>
                <div className={styles.codeEditor}>
                    <LiveEditor />
                </div>
                <div className={styles.codePreview}>
                    <LiveError />
                    <LivePreview />
                </div>
            </LiveProvider>
        </div>
    );
};

const MarkdownWithOverrides = ({ children, overrides }) => (
    <Markdown
        options={{
            overrides: {
                code: props => <CodeEditorPreview scope={overrides} children={props.children} />,
                pre: props => <div {...props} />,
                ...overrides,
            },
        }}
    >
        {children}
    </Markdown>
);

export default MarkdownWithOverrides;
