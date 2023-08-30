import { View, Text, StyleSheet, Button, Pressable, Animated, I18nManager } from "react-native";
import React from "react";
import { GoalItemType } from "../Models/GoalItemType";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { RectButton, Swipeable } from "react-native-gesture-handler";

export default function GoalItem(props: {
  goal: GoalItemType;
  deleteItemHandler: (id: string) => void;
}) 
{

  function deleteItem() {
    props.deleteItemHandler(props.goal.id);
  }


  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    return (
      <RectButton style={styles.rightAction} onPress={deleteItem}>
        <FontAwesome name="trash" style={styles.actionIcon} />
      </RectButton>
    );
  };

  return (
    <Swipeable
    friction={2}
    enableTrackpadTwoFingerGesture
    rightThreshold={40}
    renderRightActions={renderRightActions}> 
    <View style={styles.container}>
      <Text style={styles.displayValue}>{props.goal.value}</Text>
    </View>
    </Swipeable>

  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor: "#5e0acc",
    height: 50,
    marginTop: 10,
    padding: 10,
    borderRadius: 6
  },
  displayValue: {
    color: "white",
    fontSize: 16
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
    height: 20,
    fontSize: 20,
    color: 'white'
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 10,
    borderRadius: 6
  },
});
