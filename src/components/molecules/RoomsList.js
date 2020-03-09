import React from 'react';
import PropTypes from 'prop-types';
import Room from './Room';
import { roomsRef } from '../../firebase/firestoreRefs';

const RoomsList = ({ rooms }) => {
  const handleRemove = id => {
    roomsRef.doc(id).delete();
  };
  return (
    <>
      {rooms.map(({ title, id, user }) => (
        <Room title={title} id={id} key={id} user={user} handleRemove={handleRemove} />
      ))}
    </>
  );
};
RoomsList.propTypes = {
  rooms: PropTypes.object.isRequired,
};

export default RoomsList;
