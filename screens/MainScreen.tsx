import {  Pressable, SafeAreaView, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDocs, collection, QuerySnapshot, addDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { GoalItemType } from '../Models/GoalItemType';
import GoalInput from '../components/GoalInput';
import GoalItem from '../components/GoalItem';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { signOut } from 'firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';


export default function MainScreen() {
  const [goalList, setGoalList] = useState(new Array<GoalItemType>());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getList()
  },[showModal]);

  function addGoalHandler(goal: string) {
    addDoc(collection(FIRESTORE_DB, "todos"), { value: goal, timestamp: new Date() });
  }

  function deleteItemHandler(id: string) {

    const docRef = doc(FIRESTORE_DB, "todos", id);
    deleteDoc(docRef);

    getList()
  }

  function showModalHandler() {
    setShowModal(true);
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  function logout() {
    signOut(FIREBASE_AUTH);
  }

  function getList(){
    const todosRef = collection(FIRESTORE_DB, "todos");
    
    getDocs(query(todosRef, orderBy("timestamp"))).then(
        (querySnapshot: QuerySnapshot) => {
          const data = querySnapshot.docs.map(
            (doc) => ({ value: doc.data().value, id: doc.id } as GoalItemType)
          );
          setGoalList(data);
        }
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="logout" onPress={logout} />
      <GoalInput
        showModal={showModal}
        closeModalHandler={closeModalHandler}
        addGoalHandler={addGoalHandler}
      />

      <ScrollView style={styles.listView}>
        {goalList.map((goal) => (
            <GoalItem key={goal.id}  goal={goal} deleteItemHandler={deleteItemHandler} />
        ))}
      </ScrollView>

      <Pressable
        android_ripple={{ color: "#dddddd" }}
        style={({ pressed }) => pressed && styles.pressedItem}
        onPress={showModalHandler}
      >
        <FontAwesome
          size={50}
          style={{ marginBottom: -3 }}
          name="plus-circle"
          color={"#5e0acc"}
        />
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
      },
  
    listView:{
      width: '95%'
    },
  
    pressedItem:{
      opacity: 0.5
    },
  });