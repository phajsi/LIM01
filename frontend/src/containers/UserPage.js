import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../helpers/ApiFunctions';

const UserPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState(null);
  const [setsList] = useState([]);

  useEffect(() => {
    if (formData === null) {
      axiosInstance
        .get(`/usersets/`)
        .then((res) => {
          setFormData(res.data);
          res.data.map((sets) => setsList.push(sets));
          console.log(res.data);
        })
        .catch((e) => {
          return e;
        });
    }
    console.log(setsList);
  });

  return <></>;
};

export default UserPage;
