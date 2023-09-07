import { View, StyleSheet, TextInput, Button, Modal } from "react-native";
import React, { useState } from "react";
 
export default function GoalInput(props: {addGoalHandler: (goal: string) => void, showModal: boolean, closeModalHandler: () => void}) {
  const [goal, setGoal] = useState("");


  function addGoal(){
    if(goal !== ''){
        setGoal('');
        props.addGoalHandler(goal);
        props.closeModalHandler();
    }

  }

  return (
    <Modal visible={props.showModal} animationType="slide">
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={goal}
          onChangeText={setGoal}
        ></TextInput>

        <View style={styles.btnContainer}>
          <View style={styles.button}>
            <Button title="Add goal" onPress={addGoal} color="#b98cf4" />
          </View>

          <View style={styles.button}>
            <Button title="Cancel" onPress={props.closeModalHandler} color="#f31282" />
          </View>
        </View>
      </View>
    </Modal>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#311b6b'
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white'
  },
  btnContainer:{
    margin: 10,
    flexDirection:'row'
  },

  button:{
    width: 100,
    marginHorizontal: 8
  },

});
