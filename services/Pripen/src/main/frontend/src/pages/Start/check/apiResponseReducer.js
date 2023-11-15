import React from 'react';


export const initialState={
    process_Id: '',
    process_Original: '',
    process_Law_Violate: 0,
    process_Law_Danger: 0,
    process_Guide_Violate: 0,
    process_Omission_Paragraph: 0,
    process_Score: 0,
    process_Paragraph: [],
    process_Issues: [],
    process_Modified: ''
};
export default function apiResponseReducer(state, action) {

    switch (action.type) {
        case 'SET_DATA':
            return { ...state, ...action.payload };
        default:
            throw new Error('Unhandled action type');
    }
};