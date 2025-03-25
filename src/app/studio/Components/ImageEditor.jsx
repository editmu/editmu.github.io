// src/app/studio/Components/ImageEditor.jsx
"use client";
import React from 'react';

import MainView from './Views/MainView';





const ImageEditor = ({ user }) => {
    return (
        <React.Fragment>
            <MainView user={user} />
        </React.Fragment>
    );
};
export default ImageEditor;