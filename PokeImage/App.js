import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, Linking,Alert } from "react-native";

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=151&offset=0";
const firstGenPokemonPath = 'https://pokeapi.co/api/v2/type/8/';
// npx expo start --web
//1 Call Pokemon IDs --> 151 = 152 Calls to the API
var black = "purple"

  var appearValue = 'none';
export default function App() {
  const [firstGenPokemonDetails, setfirstGenPokemonDetails] = useState([]);
  const [pokemonurl,setpokemonurl] = useState([]);
  const [arr,setarr] = useState([]);
  const [color,setColor] = useState('green');
  const [active, setActive] = useState(false);
  const [popUp,setPopUp] = useState({backgroundColor:'red',width: 200, height: 200});
  const [appearValue, setAppearValue] = useState('none');
  const [nameValue, setNameValue] = useState();
  const [moveValue, setMoveValue] = useState();
  //.const estilo = {backgroundColor: black,width: 200, height: 200};

  function hola (){
    //black = 'yellow';
    styles.testPopup.backgroundColor = 'coral';
    const newsetUp = {...popUp, backgroundColor: 'gray'};
    //setPopUp(newsetUp);
    setActive(true);
    //setColor('blue');
    //black = color;
    //styles.testPopup.backgroundColor = color;
    alert(color);
    alert(styles.testPopup.backgroundColor);
    //{styles.testPopup.backgroundColor} = 'yellow';
  }

  function setAppear(name,moves){
    setNameValue(name);
    setMoveValue(moves);
    setAppearValue('flex');

  }

  function setDisappear(){
    setAppearValue('none');
  }

  useEffect(() => {
    const fetchFirstGenPokemons = async () => {
      const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
      const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();
      setpokemonurl(firstGenPokemonIdsBody.pokemon);

      const firstGenPokemonDetails = await Promise.all(
        firstGenPokemonIdsBody.pokemon.map(async (p) => {
          const pDetails = await fetch(p.pokemon.url);

          return await pDetails.json();
        })
      );

      setfirstGenPokemonDetails(firstGenPokemonDetails);
    };

    fetchFirstGenPokemons();

  }, []);

  const renderPokemon = ({ item }) => {
    return (
      <View  style={styles.pokemonContainer} onClick = {() => {setAppear(item.name, item['moves']['0']['move']['name'])}}>
        <Text style={styles.pokemonTitle}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Image
          style={styles.pokemonSprite}
          source={{
            uri: item.sprites.front_default,
          }}
        />
        <Text style = {styles.urlstyle} onPress={() => Linking.openURL(item.pokeurl)}>{item.pokeurl} </Text>
      </View>
    );
  };


const change = (changePoke, addPoke) =>{
  var num = -1;
  changePoke.map((p)=>{
    return arr.push(p.pokemon.url);
  });

  addPoke.map((p) => {
    num+=1;
    return p.pokeurl = arr[num];
  })




};

change(pokemonurl,firstGenPokemonDetails);


  return (

    <View  style={styles.container}>
      <Text style={styles.title}>Electric Pokemons</Text>
      <FlatList style= {{alignSelf: 'center'}}numColumns={4} data={firstGenPokemonDetails} renderItem={renderPokemon} />
      <StatusBar style="auto" />
      <View style ={styles.testPopup} onClick = {() => {setActive(!active)}} >Div2 </View>

      <View style ={styles.testPopup} onClick = {()=>{hola()}} >
        <Text style = {{color: 'white'}}>{styles.testPopup.backgroundColor} </Text>
      </View>
      <View style = {{ display:appearValue, zIndex:2,position:'fixed' ,backgroundColor:'lightgreen',width: 400, height: 500
       ,marginLeft: 450, marginTop: 50}} onMouseLeave = {()=>{setDisappear()}}> {moveValue\n + ' '+nameValue} </View>
    </View>
  );
}

var styles ={
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,

  },
  title: {
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 20,
    color: 'coral'
  },
  pokemonContainer: {
     backgroundColor: "lightblue",
     marginTop: 10,
     marginLeft: 10,
     width: 300,
     alignSelf: 'center',
     //display: 'none'
   },

  pokemonTitle: {
    color: 'lightcoral',
    fontSize: 32,
    alignSelf: "center",
    marginTop: 10,
  },
  pokemonSprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  urlstyle: {
    alignSelf: "Center",
    textDecorationLine: 'underline',
    color: 'orangered'
  },
  popupStyle: {
  display:appearValue, zIndex:2,position:'absolute' ,backgroundColor:'red',width: 200, height: 200
  },
  testPopup: {backgroundColor: black,width: 200, height: 200}

}
