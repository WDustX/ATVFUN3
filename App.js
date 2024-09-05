import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useEffect } from 'react';
import { ScrollView, Text , View, StyleSheet, Button, Alert } from "react-native"

const PilhaTelas = createNativeStackNavigator()
const URL_API = `https://jsonplaceholder.typicode.com/posts`;
const URL_API2 = `https://jsonplaceholder.typicode.com/comments`;



function TelaInicial({route, navigation}){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(URL_API).then(resposta => resposta.json())
        .then( json => { setPosts (json)})
        .catch( () => { Alert.alert('Erro ao carregar');
        });
      },[])

    return ( 
        <ScrollView>

        <View style={styles.container}>
            <Text>Posts</Text>
            {posts.map( us =>(
                <View style={styles.cardContainer}>
                    <View style={styles.Mrbecker}>
                    <Text>title: {us.title}</Text>
                    </View>

                    <View style={styles.MrBeast}>
                    <Button title='VER' color="red"
                        onPress={()=>{navigation.navigate("VisualizarUsuario",{'id':us.id})}}/>
                </View>
                </View>
            ) )}
        </View>
        

        </ScrollView>
        
    )}

    function VisualizarUsuario( {route,navigation}){
       const [ posts, setPosts ] = useState( {} )
       const [ comments, setComments] = useState ( {} )

       useEffect( ()=>{
        fetch( `${URL_API}/${route.params.id}`)
        .then(resposta => resposta.json())
        .then(json => { setPosts(json)})
        .catch( () => { Alert.alert('Erro ao carregar');})
        fetch( `${URL_API2}/${route.params.id}`)
        .then(resposta => resposta.json())
        .then(json => { setComments(json)})
        .catch( () => { Alert.alert('Erro ao carregar');})
    }
       
       ,
       
       [route.params.id])
    
        return (
            <ScrollView>
                 <View style={styles.container}>
                      {/*<Text>ID:{route.params.id}</Text>*/}
                      <Text>title: {posts.title }</Text>
                      <Text>Body: {posts.body}</Text>
                 </View>
                 
                 <comments.map(us =>)(
                    <View style={styles.cardContainer}>
                      <Text>Nome: {comments.name}</Text>
                      <Text>Email: {comments.email}</Text>
                      </View>
                )
                
            </ScrollView>
        )
    }

export default function app(){
    return(
        <NavigationContainer>
            <PilhaTelas.Navigator>
                <PilhaTelas.Screen
                name="TelaInicial"
                component={TelaInicial}
                options={{title:"Tela Inicial"}}
                />
                <PilhaTelas.Screen
                name="VisualizarUsuario"
                component={VisualizarUsuario}
                options={{title:"Visualizar Detalhes"}}/>
             </PilhaTelas.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"fff",
        alignItems:"center",
        justifyContent:"center",
    },
    cardContainer:{
        width:"90%",
        borderWidth:1,
        borderColor:"#d5d5d5",
        borderRadious:10,
        marginBottom:10,
        marginHorizontal:20,
        padding:10,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    Mrbecker:{
        width:"80%",
    },
    MrBeast:{
        width:"20%",
    }
})