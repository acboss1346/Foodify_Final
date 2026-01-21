import React from 'react';

export default function Skeleton({ width, height, className = '', style = {} }) {
    const styles = {
        width: width,
        height: height,
        ...style,
    };

    return (
        <div
            className={`skeleton ${className}`}
            style={styles}
            aria-hidden="true"
        />
    );
}
