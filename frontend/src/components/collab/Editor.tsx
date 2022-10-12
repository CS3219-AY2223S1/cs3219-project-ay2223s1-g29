import React, { useEffect, useMemo, useRef } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';
import ENV from '../../env';
import useIsMobile from '../../hooks/useIsMobile';
import useWidth from '../../hooks/useWidth';

export default function Editor() {
  const editorRef = useRef<any>(null);
  const width = useWidth();

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(ENV.SOCKET_URL, 'monaco', ydoc);
    const type = ydoc.getText('monaco');

    const editor = monaco.editor.create(editorRef.current, {
      value: '',
      language: 'python',
      theme: 'vs-dark',
    });

    const editorModel = editor.getModel();
    if (!editorModel) {
      return;
    }

    const monacoBinding = new MonacoBinding(
      type,
      editorModel,
      new Set([editor]),
      provider.awareness,
    );

    return () => {
      monacoBinding.destroy();
      editor.dispose();
    };
  }, [editorRef.current, width]);

  return <div id="monaco-editor" ref={editorRef} style={{ width: '100%', height: '100%' }} />;
}
