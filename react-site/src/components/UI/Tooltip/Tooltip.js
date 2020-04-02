import React from 'react';
import ReactTooltip from 'react-tooltip';
import PT from 'prop-types';

import './Tooltip.scss';

const Tooltip = ({
    id,
    content,
    place = 'top',
    children
}) => (
    <>
        <div
            data-tip={`tooltip-${id}`}
            data-for={`tooltip-${id}`}
            data-effect="solid"
            data-place={place}
        >
            {children}
        </div>

        <ReactTooltip
            id={`tooltip-${id}`}
            className="tooltip"
        >
            {content}
        </ReactTooltip>
    </>
);

Tooltip.propTypes = {
    id: PT.oneOfType([
        PT.string,
        PT.number
    ]).isRequired,
    content: PT.string.isRequired,
    children: PT.oneOfType([
        PT.object,
        PT.array
    ]).isRequired,
    place: PT.oneOf(['top', 'bottom', 'right', 'left'])
};

export default Tooltip;
