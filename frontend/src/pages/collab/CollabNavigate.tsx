import React from 'react';
import { Navigate } from 'react-router-dom';
import { GetRoomRes } from '../../apis/types/collab.type';

type CollabSuccessProps = {
  getRoomRes: GetRoomRes;
};

export default function CollabNavigate(props: CollabSuccessProps) {
  return (
    <Navigate
      to="/collab"
      state={{
        getRoomRes: props.getRoomRes,
      }}
    />
  );
}
