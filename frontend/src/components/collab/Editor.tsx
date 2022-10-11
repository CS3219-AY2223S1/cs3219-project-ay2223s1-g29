import React, { useEffect, useMemo, useRef } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';
import ENV from '../../env';

export default function Editor() {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(ENV.SOCKET_URL, 'monaco', ydoc);
    const type = ydoc.getText('monaco');

    const editor = monaco.editor.create(editorRef.current, {
      value: '',
      language: 'javascript',
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
    };
  }, [editorRef.current]);

  return <div id="monaco-editor" ref={editorRef} style={{ width: '100%', height: '100%' }} />;
}
