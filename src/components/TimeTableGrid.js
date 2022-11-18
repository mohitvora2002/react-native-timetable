import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import addOpacity from '../utils/addOpacity';
import { ConfigsContext, ThemeContext } from './TimeTable';
const TimeTableGridStroke = ({ cellWidth, cellHeight, stroke, index, isHorizontal, }) => (<View style={[
        isHorizontal ? strokeStyles.stroke : strokeStyles.verticalStroke,
        isHorizontal ? { top: cellHeight * index } : { left: cellWidth * index },
        {
            backgroundColor: "black",
        },
    ]}/>);
const TimeTableGrid = () => {
    const { text } = useContext(ThemeContext);
    const { cellHeight, cellWidth, numOfDays, numOfHours } = useContext(ConfigsContext);
    const styles = getStyles(cellWidth * numOfDays, cellHeight * numOfHours);
    const stroke = addOpacity(text, 0.25);
    return (<View style={styles.gridContainer}>
      {/* {Array.from({ length: numOfHours }, (_, i) => i).map((index) => (<TimeTableGridStroke key={index} cellWidth={cellWidth} cellHeight={cellHeight} stroke={stroke} index={index} isHorizontal={true} />))}
      {Array.from({ length: numOfDays }, (_, i) => i).map((index) => (<TimeTableGridStroke key={index} cellWidth={cellWidth} cellHeight={cellHeight} stroke={stroke} index={index} isHorizontal={false}/>))} */}
    </View>);
};
const getStyles = (width, height) => StyleSheet.create({
    gridContainer: {
        width,
        height,
    },
});
const strokeStyles = StyleSheet.create({
    stroke: {
        position: 'absolute',
        height: StyleSheet.hairlineWidth,
        width: '100%',
    },
    verticalStroke: {
        position: 'absolute',
        width: StyleSheet.hairlineWidth,
        height: '100%',
    },
});
export default TimeTableGrid;
