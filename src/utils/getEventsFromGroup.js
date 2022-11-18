const groupToEvents = ({ eventGroups, eventColors, configs, }) => {
    const events = [];
    let colorIndex = 0;
    let earlistGrid = configs.numOfHours;
    const daysOccur = new Set();
    try {
        eventGroups.forEach((event, groupIndex) => {
            Object.entries(event.sections).forEach(([k, v]) => {
                (v.days || []).forEach((day, i) => {
                    const [sHour, sMinute] = v.startTimes[i].split(':');
                    const [eHour, eMinute] = v.endTimes[i].split(':');
                    if (Number.isNaN(sHour) ||
                        Number.isNaN(eHour) ||
                        Number.isNaN(typeof day === "string" ? parseInt(day, 10) : day))
                        return;
                    const sTime = +sHour + +sMinute / 60;
                    const eTime = +eHour + +eMinute / 60;
                    const timeGrid = sTime - 8;
                    if (timeGrid < earlistGrid) {
                        earlistGrid = timeGrid;
                    }
                    if (sTime - 1 < configs.startHour) {
                        configs.startHour = sTime - 1;
                    }
                    if (eTime + 1 > configs.endHour) {
                        configs.endHour = eTime + 1;
                    }
                    if (!daysOccur.has(day)) {
                        daysOccur.add(day);
                    }
                    events.push({
                        courseId: event.courseId,
                        title: event.title,
                        section: k,
                        day: day,
                        startTime: v.startTimes[i],
                        endTime: v.endTimes[i],
                        location: v.locations[i],
                        color: eventColors[colorIndex % eventColors.length],
                        groupIndex: groupIndex,
                    });
                });
            });
            colorIndex++;
        });
        configs.numOfDays = Math.max(daysOccur.size, configs.numOfDays);
        return {
            events,
            configs,
            earlistGrid,
        };
    }
    catch (error) {
        console.warn('Invalid TimeTable');
        return {
            events: [],
            configs,
            earlistGrid,
        };
    }
};
export default groupToEvents;
