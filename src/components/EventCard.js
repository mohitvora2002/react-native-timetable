import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import addOpacity from '../utils/addOpacity';
import colorMixing from '../utils/colorMixing';
import { ConfigsContext } from './TimeTable';
const EventCard = ({ event, onPress, backgroundColor }) => {
    const configs = useContext(ConfigsContext);
    const styles = getStyles(event, configs, backgroundColor);
    return (<TouchableOpacity activeOpacity={0.7} style={[styles.courseCard, styles.innerCard]} onPress={onPress}>
    
    <View style={{marginLeft:10,marginTop:10,backgroundColor:"#F1E7CC",width:26,height:26,borderRadius:6,alignItems:"center",justifyContent:"center"}}>
    <Image
        style={{width:20,height:20}}
        source={require('../../lib/assets/images/nails.png')}
      />


       
    </View>
      {/* <Text style={styles.courseCardTitle} ellipsizeMode="clip">
        {`${event.courseId}${event.section ? ` ${event.section}` : ''}`}
      </Text> */}
      <Text style={styles.courseCardLocation}>{event.location}</Text>
    </TouchableOpacity>);
};
const getStyles = (event, configs, backgroundColor,color) => {
    const { cellWidth , cellHeight, startHour } = configs;
    const sTime = event.startTime.split(':').map((x) => parseInt(x, 10));
    const eTime = event.endTime.split(':').map((x) => parseInt(x, 10));
    const topMarginValue = (sTime[0] - startHour) * cellHeight + (sTime[1] / 60.0) * cellHeight;
    const durationHeight = cellHeight * (eTime[0] - sTime[0] + (eTime[1] - sTime[1]) / 60.0);
    const textColor = addOpacity(event.color, 0.8);
    const bgColor = colorMixing(addOpacity(event.color, 0.15), backgroundColor);
    const styles = StyleSheet.create({
        courseCard: {
            position: 'absolute',
            borderRadius: 6,
            zIndex: 2,
            width: cellWidth-5,
            marginLeft: cellWidth * (event.day - 1),
            height: durationHeight,
            marginTop: topMarginValue,
        },
        innerCard: {
            flex: 1,
            overflow: 'hidden',
            borderRadius: 6,
            padding: 4,
            backgroundColor: event.color,
        },
        courseCardTitle: {
            fontSize: 10,
            lineHeight: 11,
            fontWeight: 'bold',
            color: textColor,
        },
        courseCardLocation: {
            marginTop: 2,
            fontSize: 14,
            color: '#FFFFFF',
            marginLeft:10
        },
    });
    return styles;
};
export default EventCard;
