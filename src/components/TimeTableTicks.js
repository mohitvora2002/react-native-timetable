import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConfigsContext } from './TimeTable';
const TimeTableTicks = () => {
    const configs = useContext(ConfigsContext);
    const { startHour, endHour } = configs;
    const styles = getStyles(configs);
    return (<View style={styles.timeTableTicks}>
      {Array.from({ length: endHour - startHour + 1}, (_, i) => startHour + i).map((hour) => (<View style={styles.timeLineBox} key={`timeline-${hour}`}>
          { (<Text style={styles.timeLineText}>{`${hour > 9 ? '' + hour.toFixed(0) : '0' + hour.toFixed(0)}:00`}</Text>)}
           {/* { (<Text style={styles.timeLineText}>{ hour}</Text>)} */}
          {<Text style={styles.timeLineFormaterText}>AM</Text>}
        </View>))}
    </View>);
};
const getStyles = (configs) => StyleSheet.create({
    timeTableTicks: {
        width: configs.timeTicksWidth,
        minWidth: configs.timeTicksWidth,
    },
    timeLineText: {
        marginTop: 1,
        fontSize: 13,
        textAlign: 'center',
        color: '#121212',
    },
    timeLineFormaterText: {
        fontSize: 12,
        marginRight:9,
        textAlign: 'right',
        color: 'gray',
    },
    timeLineBox: {
        paddingLeft: 2,
        height: configs.cellWidth,
        backgroundColor: 'transparent',
    },
});
export default TimeTableTicks;
