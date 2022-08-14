// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import { useState } from 'react';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  function startAddGoalHandler() {
    setVisibleModal(true);
  }
  function endAddGoalHandler() {
    setVisibleModal(false);
  }

  function addGoalHandler(enteredGoalText) {
    //button handler sets state -> spreads past state then adds updated state
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    //best practice is to use a function to return update state
    //ESP if new state depends on previous state
    endAddGoalHandler();
    //after updating state
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style = 'light'/>
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='white'
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={visibleModal}
          onCancel={endAddGoalHandler}
        />

        <View style={styles.goalsContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={courseGoals}
            renderItem={(itemData) => {
              //renderItem (itemData ) ---- itemData is an object with metadata and item property
              return (
                <GoalItem
                  id={itemData.item.id}
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // title: { marginLeft: '35%', fontWeight: 'bold', paddingBottom: 2 },
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#1e085a',
  },

  goalsContainer: {
    flex: 5,
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // dummy: { margin: 16, borderWidth: 2, borderColor: 'blue', padding: 16 },
});

/* NOTES* 
- App.Js = root component
- cannot use h2 or divs or any HTML elements with DOM ; but wont work here
- <div> = <View>
- <input> = <TextInput>
- <view> = build boxes that hold content w/in respective elements
*/
