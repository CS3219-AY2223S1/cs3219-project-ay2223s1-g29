import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';
import useWidth from '../../hooks/useWidth';
import { GetRoomRes } from '../../apis/types/collab.type';
import Waiting from './Waiting';

type EditorProps = {
  roomRes: GetRoomRes;
  isAllJoined: boolean;
};

export default function Editor(props: EditorProps) {
  const editorRef = useRef<any>(null);
  const width = useWidth();
  const {
    roomRes: { _id: roomId },
  } = props;

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    if (!props.isAllJoined) {
      return;
    }

    const ydoc = new Y.Doc();
    // the typings for this library is wrong
    // see the example on the docs
    // @ts-ignore
    const provider = new WebrtcProvider(`cs3219-g29-2022-${roomId}`, ydoc, {
      password: roomId,
      signaling: [
        'wss://signaling.yjs.dev',
        'wss://cs3219-yjs-service-dot-cs3219-362509.et.r.appspot.com',
        'wss://y-webrtc-signaling-eu.herokuapp.com',
        'wss://y-webrtc-signaling-us.herokuapp.com',
      ],
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

    const monacoBinding = new MonacoBinding(type, editorModel);

    return () => {
      editor.dispose();
      provider.destroy();
      ydoc.destroy();
    };
  }, [width, props]);

  return (
    <>
      {!props.isAllJoined && <Waiting />}
      <div
        id="monaco-editor"
        ref={editorRef}
        style={{ display: !props.isAllJoined ? 'none' : 'block', width: '100%', height: '100%' }}
      />
    </>
  );
}
