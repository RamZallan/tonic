import React from 'react';

export default ({ machine, uid, item, time }) => {
    return (
        <tr>
            <td>
                <img
                    className="rounded-circle"
                    src={`https://profiles.csh.rit.edu/image/${uid}`}
                    alt=""
                    aria-hidden={true}
                    width={20}
                    height={20}
                />
                {uid}
            </td>
            <td>{machine}</td>
            <td>{item}</td>
            <td>{time}</td>
        </tr>
    );
};
