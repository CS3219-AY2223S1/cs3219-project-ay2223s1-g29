import React, { useEffect, useMemo, useRef } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';
import ENV from '../../env';
import useIsMobile from '../../hooks/useIsMobile';
import useWidth from '../../hooks/useWidth';
import { GetRoomRes } from '../../apis/types/collab.type';

type EditorProps = {
  roomRes: GetRoomRes;
};

export default function Editor(props: EditorProps) {
  const editorRef = useRef<any>(null);
  const width = useWidth();
  const {
    roomRes: { _id: roomId },
  } = props;

  useEffect(() => {
    console.log('reloading');
    if (!editorRef.current) {
      return;
    }

    const ydoc = new Y.Doc();
    // the typings for this library is wrong
    // see the example on the docs
    // @ts-ignore
    const provider = new WebrtcProvider(`cs3219-g29-2022-${roomId}`, ydoc, {
      password: roomId,
      signaling: [ENV.YJS_SVC],
    });
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
      provider.destroy();
      ydoc.destroy();
    };
  }, [width]);

  return <div id="monaco-editor" ref={editorRef} style={{ width: '100%', height: '100%' }} />;
}
