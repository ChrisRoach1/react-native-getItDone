import { View, Text, FlatList, Pressable, SafeAreaView, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDocs, collection, QuerySnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoalItemType } from '../Models/GoalItemType';
import GoalInput from '../components/GoalInput';
import GoalItem from '../components/GoalItem';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { signOut } from 'firebase/auth';

export default function MainScreen() {
    const [goalList, setGoalList] = useState(new Array<GoalItemType>);
    const [showModal, setShowModal] = useState(false);
  
  
    useEffect(() =>{
      getDocs(collection(FIRESTORE_DB, "todos")).then((querySnapshot: QuerySnapshot) =>{
        const data = querySnapshot.docs.map((doc) => ({value: doc.data().value, id:doc.id } as GoalItemType));
        setGoalList(data);
      });
    })
  
    function addGoalHandler(goal: string){
      addDoc(collection(FIRESTORE_DB, "todos"), {value: goal});
    }
  
  
    function deleteItemHandler(id: string){
      const docRef = doc(FIRESTORE_DB, "todos", id);
      deleteDoc(docRef);
    }
  
    function showModalHandler(){
      setShowModal(true);
    }
  
    function closeModalHandler(){
      setShowModal(false);
    }
  
    function logout(){
        signOut(FIREBASE_AUTH);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title='logout' onPress={logout}/>
        <GoalInput showModal={showModal} closeModalHandler={closeModalHandler} addGoalHandler={addGoalHandler}/>
        <FlatList
          style={styles.listView}
          data={goalList}
          renderItem={(item) => <GoalItem goal={item.item} deleteItemHandler={deleteItemHandler}/>}
          keyExtractor={item => item.id.toString()}
        />      
        
        <Pressable 
        android_ripple={{ color: "#dddddd" }}
        style={({pressed}) => pressed && styles.pressedItem}
        onPress={showModalHandler}>
        <FontAwesome size={50} style={{ marginBottom: -3 }} name="plus-circle" color={"#5e0acc"} />
        </Pressable>
        <StatusBar style="auto" />
      </SafeAreaView>
    )
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