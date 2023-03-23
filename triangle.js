//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Triangle from 'react-native-triangle';


// create a component
const MyComponent = () => {
    useEffect(()=>{
        console.log("use effect paerent")
    }, []);
    const array = ['t', 'e', 'x', 't'];
    console.log(array.toString());
    console.log('json' +JSON.stringify(array));
    return (
        <View style={styles.container}>
            <Triangle 
             width={12}
             height={12}
             color={'#00ff00'}
             direction='down' 
             style={{margin:10}}/>
           <Text>{array.toString()}</Text>
           <Triangle 
             width={12}
             height={12}
             color={'#ffff00'}
             direction='up' 
             style={{margin:10}}
            />
           

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        padding:20
    },
});

//make this component available to the app
export default MyComponent;
