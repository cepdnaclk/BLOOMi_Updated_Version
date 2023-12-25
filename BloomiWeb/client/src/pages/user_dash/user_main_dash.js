import React, { useEffect } from 'react';
import AuthServices from '../../services/AuthServices';

export default function UserMaindash() {


  useEffect(() => {
    const fetchData = () => {
      AuthServices.getData();
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>User Main Dashboard</h1>
    </div>
  );
}
