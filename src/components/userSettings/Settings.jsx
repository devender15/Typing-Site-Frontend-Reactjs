import React from 'react';
import { Routes, Route } from "react-router-dom";

import ProfileSettings from './ProfileSettings';
import Performance from './Performance';
import Account from './Account';


const Settings = ({ user, userToken }) => {
  return (
    <Routes>
        <Route path="/" element={<ProfileSettings userToken={userToken} user={user}/>}/>
        <Route path="/performance" element={<Performance user={user} userToken={userToken}/>}/>
        <Route path="/account" element={<Account user={user} userToken={userToken} />}/>
    </Routes>
  )
}

export default Settings;