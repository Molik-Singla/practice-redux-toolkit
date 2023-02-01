import React from "react";

import { parseISO, formatDistance } from "date-fns";

const TimeAgo = ({ timeStamp }) => {
    let timeAgo = "";

    if (timeStamp) {
        const date = parseISO(timeStamp);

        const timePeriod = formatDistance(date, new Date());
        timeAgo = `${timePeriod} ago`; // It is like : 10 minutes ago
    }
    return (
        <span title={timeStamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    );
};

export default TimeAgo;
